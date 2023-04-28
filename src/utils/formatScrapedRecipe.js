/* eslint-disable camelcase */
import { fraction } from "mathjs";
import { formatAmount } from "./helperFunctions";
import Ingredient from "./Ingredient";

function formatNutrientObj(obj) {
  if (!obj || !Object.keys(obj).length) return null;

  const formattedObj = {};

  // Match numbers and vulgar fractions at start
  const numRE = /^([1-9][0-9]*|0)((\/[1-9][0-9]*)|(\.[0-9]*))?/;

  for (const [key, val] of Object.entries(obj)) {
    if (!val) continue;

    const quantity = val.match(numRE);

    let unit = val.replace(numRE, "");

    unit = unit.trim() || "";

    if (quantity[0].includes("/")) {
      quantity[0] = fraction(quantity[0]);
    }

    formattedObj[key] = {
      quantity: quantity ? Number(quantity[0]) : null,
      unit,
    };
  }

  return formattedObj;
}

export default function formatScrapedRecipe(data) {
  const {
    canonical_url,
    cook_time,
    ingredients,
    instructions_list,
    nutrients,
    prep_time,
    title,
    yields,
  } = data;

  if (!ingredients || !instructions_list || !title) {
    return null;
  }

  return {
    url: canonical_url,
    cookTime: cook_time,
    ingredients: ingredients.map((el) =>
      Ingredient.normalizeIngredientString(el)
    ),
    instructions: instructions_list,
    nutrients: nutrients && formatNutrientObj(nutrients),
    prepTime: prep_time,
    title,
    servings: yields ? Number(yields.split(" ")[0]) : 1,
  };
}

export function getNutrientStringsFromObj(obj, mult = 1) {
  if (!obj || mult < 0) return null;

  const nutrientStrings = [];

  for (const [key, val] of Object.entries(obj)) {
    if (!val) {
      continue;
    }

    let name = key.replace("Content", "");
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const nameWords = name.match(/[A-Z][a-z]+/g);
    const nameStr = nameWords.reduce(
      (acc, el, i) => (i + 1 !== nameWords.length ? `${acc + el} ` : acc + el),
      ""
    );

    const nutrientString = `${nameStr}: ${formatAmount(
      val.quantity * mult,
      0
    )}${val.unit ? ` ${val.unit}` : ""}`;

    if (nameStr !== "Serving Size" && nameStr !== "Serving Size ") {
      nutrientStrings.push(nutrientString);
    } else {
      nutrientStrings.unshift(nutrientString);
    }
  }

  return nutrientStrings;
}

export function getNutrientsStr(nutrients, mult = 1) {
  const nutrientStrings = getNutrientStringsFromObj(nutrients, mult);

  return nutrientStrings.reduce(
    (acc, el, i) =>
      i === nutrientStrings.length - 1 ? `${acc}${el}` : `${acc}${el}, `,
    ""
  );
}

export function getNutrientsArrayFromObject(obj) {
  if (!obj) return null;

  const nutrientArr = [];

  for (const [key, val] of Object.entries(obj)) {
    let name = key.replace("Content", "");
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const nameWords = name.match(/[A-Z][a-z]+/g);
    const nameStr = nameWords.reduce(
      (acc, el, i) => (i + 1 !== nameWords.length ? `${acc + el} ` : acc + el),
      ""
    );
    if (val) {
      nutrientArr.push({
        name: nameStr,
        quantity: val.quantity,
        unit: val.unit,
      });
    }
  }

  return nutrientArr;
}

export function getArrFromNutrientsObject(obj) {
  const nutrientsArr = [];

  for (const [key, value] of Object.entries(obj)) {
    nutrientsArr.push({ [key]: value });
  }

  return nutrientsArr;
}
