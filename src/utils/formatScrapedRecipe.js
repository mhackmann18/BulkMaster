/* eslint-disable camelcase */
import { fraction } from "mathjs";
import { isCookingUnit, normalizeCookingUnit } from "./cookingUnit";

function getFracStrFromUniChar(str) {
  /* Accepts a single unicode character and returns its string representation, or null if it's not a valid unicode fraction */

  const unicodeFractions = [
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
  const unicodeFractionsConversions = [
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

function getArrayFromIngredient(str, mult = 1) {
  const strCopy = str.trim();
  const tokens = strCopy.split(" ");

  // Match integers, decimals, and vulgar fractions
  const numericalRE = /^([1-9][0-9]*|0)((\/[1-9][0-9]*)|(\.[0-9]*))?/;

  // These values will be used to build the final ingredients string
  const normalizedTokens = [];

  for (let i = 0; i < tokens.length; i += 1) {
    const current = tokens[i];
    const match = current.match(numericalRE);
    const num = (match && match[0]) || getFracStrFromUniChar(current);

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
      const unit = normalizeCookingUnit(current);

      // Unit should be plural if the number before it was greater than 1
      if (
        typeof normalizedTokens.at(-1) === "number" &&
        normalizedTokens.at(-1) > 1
      ) {
        normalizedTokens.push(`${unit}s`);
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

export function getNewIngredientString(str, mult = 1) {
  return getArrayFromIngredient(str, mult).join(" ");
}

// function createIngredientObjFromStr(str, mult = 1) {
//   let ingredientArr = getArrayFromIngredient(str, mult);

//   console.log(ingredientArr);
// }

function formatNutrientObj(obj) {
  if (!obj || !Object.keys(obj).length) return null;

  const formattedObj = {};

  // Match numbers and vulgar fractions at start
  const numRE = /^([1-9][0-9]*|0)((\/[1-9][0-9]*)|(\.[0-9]*))?/;

  for (const [key, val] of Object.entries(obj)) {
    if (!val) continue;

    const quantity = val.match(numRE);

    let unit = val.replace(numRE, "");

    unit = unit.trim() || null;

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

function formatAmount(num, precision) {
  let multiplier = precision * 10;
  if (!precision || precision < 0) multiplier = 1;
  return `${Math.round(num * multiplier) / multiplier}`;
}

export function getNutrientStringsFromObj(obj, mult = 1) {
  if (!obj || mult < 0) return null;

  const nutrientArr = [];

  for (const [key, val] of Object.entries(obj)) {
    let name = key.replace("Content", "");
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const nameWords = name.match(/[A-Z][a-z]+/g);
    let nameStr = nameWords.reduce(
      (acc, el, i) => (i + 1 !== nameWords.length ? `${acc + el} ` : acc + el),
      ""
    );
    if (nameStr === "Carbohydrate") nameStr += "s";
    if (val) {
      nutrientArr.push(
        `${nameStr}: ${formatAmount(val.quantity * mult, 0)}${
          val.unit ? ` ${val.unit}` : ""
        }`
      );
    }
  }

  return nutrientArr;
}

export function getIngredientsMultiplier(
  recipe,
  newServingsCount,
  newCaloriesCount
) {
  if (!recipe || !newServingsCount) return 1;

  const oldServingsCount = recipe.servings;

  if (!newCaloriesCount) return newServingsCount / oldServingsCount;

  if (!oldServingsCount) return null;

  const oldCalorieCount =
    recipe.nutrients && recipe.nutrients.calories.quantity;

  if (!oldCalorieCount) return newServingsCount / oldServingsCount;

  return (
    ((newCaloriesCount / oldCalorieCount) * newServingsCount) / oldServingsCount
  );
}

export function getNutrientsStr(nutrients, mult = 1) {
  const nutrientStrings = getNutrientStringsFromObj(nutrients, mult);

  return nutrientStrings.reduce(
    (acc, el, i) =>
      i === nutrientStrings.length - 1 ? `${acc}${el}` : `${acc}${el}, `,
    ""
  );
}
