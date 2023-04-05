import { isCookingUnit, normalizeCookingUnit } from "./cookingUnit";
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

  // ingredients.map((el) => createIngredientObjFromStr(el, 1));

  return {
    url: canonical_url,
    cookTime: cook_time,
    ingredients: ingredients.map((el) => getNewIngredientString(el)),
    instructions: instructions_list,
    nutrients: nutrients && formatNutrientObj(nutrients),
    prepTime: prep_time,
    title,
    servings: yields ? Number(yields.split(" ")[0]) : 1,
  };
}

export function getNewIngredientString(str, mult = 1) {
  return getArrayFromIngredient(str, mult).join(" ");
}

function getArrayFromIngredient(str, mult = 1) {
  let strCopy = str.trim();
  let tokens = strCopy.split(" ");

  // Match integers, decimals, and vulgar fractions
  let numericalRE = /^([1-9][0-9]*|0)((\/[1-9][0-9]*)|(\.[0-9]*))?/;

  // These values will be used to build the final ingredients string
  let normalizedTokens = [];

  for (let i = 0; i < tokens.length; i++) {
    let current = tokens[i];
    let match = current.match(numericalRE);
    let num = (match && match[0]) || getFracStrFromUniChar(current);

    // Handle number tokens
    if (num) {
      // If the token from the last iteration was a number, add this one to it
      if (normalizedTokens && typeof normalizedTokens.at(-1) === "number") {
        normalizedTokens[normalizedTokens.length - 1] +=
          Number(fraction(num)) * mult;
      } else {
        normalizedTokens.push(Number(fraction(num)) * mult);
      }
      // Handle cooking unit tokens
    } else if (isCookingUnit(current)) {
      let unit = normalizeCookingUnit(current);

      // Unit should be plural if the number before it was greater than 1
      if (
        typeof normalizedTokens.at(-1) === "number" &&
        normalizedTokens.at(-1) > 1
      ) {
        normalizedTokens.push(unit + "s");
      } else {
        normalizedTokens.push(unit);
      }
      // Handle unintersting tokens
    } else {
      // Edge case: Undo multiplication operation of any number token that was
      // not was not followed by a unit, or was not the first in the string
      if (
        normalizedTokens.length > 1 &&
        typeof normalizedTokens.at(-1) === "number"
      ) {
        normalizedTokens[normalizedTokens.length - 1] /= mult;
      }
      normalizedTokens.push(current);
    }

    if (typeof normalizedTokens.at(-1) === "number") {
      normalizedTokens[normalizedTokens.length - 1] =
        Math.round(normalizedTokens[normalizedTokens.length - 1] * 100) / 100;
    }
  }

  return normalizedTokens;
}

// function createIngredientObjFromStr(str, mult = 1) {
//   let ingredientArr = getArrayFromIngredient(str, mult);

//   console.log(ingredientArr);
// }

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

export function getNutrientStringsFromObj(obj, mult = 1) {
  if (!obj || mult < 0) return null;

  let nutrientArr = [];

  for (let [key, val] of Object.entries(obj)) {
    let name = key.replace("Content", "");
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let nameWords = name.match(/[A-Z][a-z]+/g);
    let nameStr = nameWords.reduce(
      (acc, el, i) => (i + 1 !== nameWords.length ? acc + el + " " : acc + el),
      ""
    );
    if (nameStr === "Carbohydrate") nameStr += "s";
    val &&
      nutrientArr.push(
        `${nameStr}: ${formatAmount(val.quantity * mult, 0)}${
          val.unit ? " " + val.unit : ""
        }`
      );
  }

  return nutrientArr;
}

function formatAmount(num, precision) {
  let multiplier = precision * 10;
  if (!precision || precision < 0) multiplier = 1;
  return `${Math.round(num * multiplier) / multiplier}`;
}
