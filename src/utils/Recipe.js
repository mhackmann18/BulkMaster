import { fraction } from "mathjs";
import { v4 as uuidv4 } from "uuid";
import Ingredient from "./Ingredient";
import {
  getNumberFromNumericalString,
  isStringPositiveNumber,
} from "./helperFunctions";

const nutrientUnits = {
  calories: "kcal",
  fat: "g",
  saturatedFat: "g",
  unsaturatedFat: "g",
  transFat: "g",
  carbohydrate: "g",
  protein: "g",
  sugar: "g",
  cholesterol: "mg",
  sodium: "mg",
  fiber: "g",
};

export default class Recipe {
  constructor({
    title, // string
    ingredients, // array of objects or strings
    instructions, // array of strings
    nutrients, // object or array of objects
    servings, // number or string with the first token being a number
    servingSize, // object of shape: { quantity: number, unit: string } or a falsy
    prepTime, // number
    cookTime, // number
    id, // a number greater than 0 or a fasly
  }) {
    this.title = title;
    this.ingredients = ingredients.length
      ? ingredients.map((ingredient) => new Ingredient(ingredient))
      : [];
    this.instructions = instructions.map((el) =>
      typeof el === "string" ? { text: el, id: uuidv4() } : el
    );
    this.nutrients = Recipe.formatNutrientObj(nutrients);
    this.servings =
      typeof servings === "number" ? servings : Number(servings.split(" ")[0]);
    this.servingSize =
      servingSize ||
      Recipe.servingSizeStringToObject(nutrients && nutrients.servingSize);
    this.prepTime = prepTime;
    this.cookTime = cookTime;
    this.id = id || null;
  }

  getNutrientByName(name) {
    const nameUpperCase = name.charAt(0).toUpperCase() + name.slice(1);

    for (const nutrient of this.nutrients) {
      if (nutrient.name === nameUpperCase) {
        return nutrient;
      }
    }

    return null;
  }

  addIngredient(name, unit, quantity) {
    this.ingredients.push(new Ingredient({ name, unit, quantity }));
  }

  addInstruction(str) {
    this.instructions.push({ text: str, id: uuidv4() });
    console.log(this.instructions);
  }

  removeIngredientById(id) {
    if (!id) return null;

    let removedIngredientIndex = -1;

    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].id === id) {
        removedIngredientIndex = i;
        break;
      }
    }

    if (removedIngredientIndex === -1) return null;

    return this.ingredients.splice(removedIngredientIndex, 1);
  }

  removeInstructionById(id) {
    if (!id) return null;

    let removeInstructionIndex = -1;

    for (let i = 0; i < this.instructions.length; i++) {
      if (this.instructions[i].id === id) {
        removeInstructionIndex = i;
        break;
      }
    }

    if (removeInstructionIndex === -1) return null;

    return this.instructions.splice(removeInstructionIndex, 1);
  }

  static formatNutrientObj(obj) {
    if (!obj || !Object.keys(obj).length) return null;

    const formattedObj = {};

    // Match numbers and vulgar fractions at start
    const numRE = /^([1-9][0-9]*|0)((\/[1-9][0-9]*)|(\.[0-9]*))?($|\s)/;

    for (const [key, val] of Object.entries(obj)) {
      // Object has already been formatted
      if (val.unit || val.quantity) return obj;
      if (!val || key === "servingSize") continue;

      const quantity = val.match(numRE);

      if (quantity && quantity[0].includes("/")) {
        quantity[0] = fraction(quantity[0]);
      }

      const name = key.replace("Content", "");

      formattedObj[name] = {
        quantity: quantity ? Number(quantity[0]) : null,
        unit: nutrientUnits[name],
      };
    }

    return formattedObj;
  }

  static getNutrientNameStringFromKey(key) {
    const name = key.charAt(0).toUpperCase() + key.slice(1);
    const nameWords = name.match(/[A-Z][a-z]+/g);
    const nameStr = nameWords.reduce(
      (acc, el, i) => (i + 1 !== nameWords.length ? `${acc + el} ` : acc + el),
      ""
    );

    return nameStr;
  }

  static getNutrientsStrings(nutrients) {
    const strArr = [];
    for (const [key, val] of Object.entries(nutrients)) {
      const nameStr = Recipe.getNutrientNameStringFromKey(key);
      strArr.push(`${nameStr}: ${val.quantity} ${val.unit}`);
    }
    return strArr;
  }

  static getValidNutrientsArr() {
    const arr = [];
    for (const [name, unit] of Object.entries(nutrientUnits)) {
      arr.push({ name, unit });
    }
    return arr;
  }

  static servingSizeStringToObject(str) {
    // Serving size may be a singular number
    if (!str || typeof str !== "string") {
      return {
        quantity: 1,
        unit: "serving",
      };
    }

    const tokens = str.split(" ");

    if (!tokens.length) {
      return {
        quantity: 1,
        unit: "serving",
      };
    }

    if (isStringPositiveNumber(tokens[0])) {
      if (tokens.length === 1) {
        return {
          quantity: getNumberFromNumericalString(tokens[0]),
          unit: "serving",
        };
      }
      return {
        quantity: getNumberFromNumericalString(tokens[0]),
        unit: tokens.slice(1).join(" ").trim(),
      };
    }

    return {
      quantity: 1,
      unit: tokens.join(" ").trim(),
    };
  }

  static getRecipeMultiplier(recipe, newServingsCount, newCaloriesCount) {
    if (!recipe || !newServingsCount) return 1;

    const oldServingsCount = recipe.servings;

    if (!newCaloriesCount) return newServingsCount / oldServingsCount;

    if (!oldServingsCount) return null;

    const oldCalorieCount =
      recipe.nutrients && recipe.nutrients.calories.quantity;

    if (!oldCalorieCount) return newServingsCount / oldServingsCount;

    return (
      ((newCaloriesCount / oldCalorieCount) * newServingsCount) /
      oldServingsCount
    );
  }
}
