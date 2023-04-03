import Measurement from "./Measurement";
import { fraction } from "mathjs";

export default function formatScrapedRecipe(data) {
  let {
    canonical_url,
    cook_time,
    ingredients,
    instructions_list,
    nutrients,
    prep_time,
    title,
    yields,
  } = data;

  if (!ingredients || !instructions_list || !title) return null;

  return {
    url: canonical_url,
    cookTime: cook_time,
    ingredients: ingredients.map(createIngredientObjFromStr),
    instructions: instructions_list,
    nutrients: nutrients && formatNutrientObj(nutrients),
    prepTime: prep_time,
    title,
    servings: yields ? Number(yields.split(" ")[0]) : 1,
  };
}

function formatNutrientObj(obj) {
  if (!obj || !Object.keys(obj).length) return null;

  // Match numbers and vulgar fractions at start
  let numRE = /^([1-9][0-9]*|0)((\/[1-9][0-9]*)|(\.[0-9]*))?/;

  for (let [key, val] of Object.entries(obj)) {
    if (!val) continue;

    let quantity = val.match(numRE);

    let unit = val.replace(numRE, "");

    unit = unit.trim() || null;

    if (quantity[0].includes("/")) {
      quantity[0] = fraction(quantity[0]);
    }

    obj[key] = {
      quantity: quantity ? Number(quantity[0]) : null,
      unit,
    };
  }

  delete obj.servingSize;

  return obj;
}

function createIngredientObjFromStr(str) {
  str = str.trim();
  let tokens = str.split(" ");

  // Match numbers and vulgar fractions
  let numOrFractionRE = /^([1-9][0-9]*|0)((\/[1-9][0-9]*)|(\.[0-9]*))?/;

  let quantities = [];

  // Check for numegers, decimals and fractional strings ('10', '2.32', '1/2' etc.)
  while (tokens[0].match(numOrFractionRE) || getFracStrFromUniChar(tokens[0])) {
    quantities.push(tokens.shift());
  }

  let quantity = quantities.reduce(
    (acc, el) => acc + fraction(getFracStrFromUniChar(el) || el),
    0
  );
  quantity = quantity || null;

  let units;

  if ((units = new Measurement(tokens[0]).units) != null) {
    tokens.shift();
  }

  return {
    name: tokens.join(" "),
    quantity,
    unit: units,
  };
}

function getFracStrFromUniChar(str) {
  /* Accepts a single unicode character and returns its string representation, or null if it's not a valid unicode fraction */

  let unicodeFractions = [
    "½",
    "⅓",
    "⅔",
    "¼",
    "¾",
    "⅕",
    "⅖",
    "⅗",
    "⅘",
    "⅙",
    "⅚",
    "⅐",
    "⅛",
    "⅜",
    "⅝",
    "⅞",
    "⅑",
    "⅒",
  ];
  let unicodeFractionsConversions = [
    "1/2",
    "1/3",
    "2/3",
    "1/4",
    "3/4",
    "1/5",
    "2/5",
    "3/5",
    "4/5",
    "1/6",
    "5/6",
    "1/7",
    "1/8",
    "3/8",
    "5/8",
    "7/8",
    "1/9",
    "1/10",
  ];

  return unicodeFractions.includes(str)
    ? unicodeFractionsConversions[unicodeFractions.indexOf(str)]
    : null;
}
