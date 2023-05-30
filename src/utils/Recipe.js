import { fraction } from "mathjs";
import { v4 as uuidv4 } from "uuid";
import Ingredient from "./Ingredient";
import {
  formatAmount,
  getNumberFromNumericalString,
  isStringPositiveNumber,
} from "./helperFunctions";

export const nutrientUnits = {
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
    title,
    ingredients,
    instructions,
    nutrients,
    servings,
    servingSize,
    prepTime,
    cookTime,
    id,
  }) {
    this.title = title;
    this.ingredients = ingredients.length
      ? ingredients.map((ingredient) => new Ingredient(ingredient))
      : [];
    this.instructions = instructions.map((el) =>
      typeof el === "string" ? { text: el, id: uuidv4() } : { ...el }
    );
    this.nutrients = Recipe.formatNutrientObj(nutrients);
    this.servings =
      typeof servings === "number" ? servings : Number(servings.split(" ")[0]);
    this.servingSize = servingSize
      ? JSON.parse(JSON.stringify(servingSize))
      : Recipe.servingSizeStringToObject(nutrients && nutrients.servingSize);
    this.prepTime = prepTime || null;
    this.cookTime = cookTime || null;
    this.id = id || null;
  }

  addIngredient(name, unit, quantity) {
    this.ingredients.push(new Ingredient({ name, unit, quantity }));
  }

  addInstruction(str) {
    this.instructions.push({ text: str, id: uuidv4() });
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

  // Compares another Recipe instance for shallow equality (not considering array element ids or recipe id)
  isEquivalent(obj) {
    if (!(obj instanceof Recipe)) {
      console.log("Instance");
      return false;
    }
    // Title
    if (obj.title !== this.title) {
      console.log("title");
      return false;
    }
    // Ingredients
    if (this.ingredients.length !== obj.ingredients.length) {
      console.log("Ingredients length");
      return false;
    }
    for (let i = 0; i < this.ingredients.length; i++) {
      if (
        formatAmount(this.ingredients[i].quantity, 3) !==
          formatAmount(obj.ingredients[i].quantity, 3) ||
        this.ingredients[i].unit !== obj.ingredients[i].unit ||
        this.ingredients[i].name !== obj.ingredients[i].name
      ) {
        console.log(
          `Ingredient ${this.ingredients[i].name} not equal to ${obj.ingredients[i].name}`
        );
        console.log(this.ingredients[i], obj.ingredients[i]);
        return false;
      }
    }
    // Instructions
    if (this.instructions.length !== obj.instructions.length) {
      console.log("Instructions");
      return false;
    }
    for (let i = 0; i < this.instructions.length; i++) {
      if (this.instructions[i].text !== obj.instructions[i].text) {
        console.log("Instructions");
        return false;
      }
    }
    // Nutrients
    if (
      (!this.nutrients || !obj.nutrients) &&
      this.nutrients !== obj.nutrients
    ) {
      console.log(this.nutrients, obj.nutrients);
      return false;
    }
    if (this.nutrients && obj.nutrients) {
      if (
        Object.keys(this.nutrients).length !== Object.keys(obj.nutrients).length
      ) {
        console.log(obj.nutrients, this.nutrients);
        return false;
      }
      for (const [name, value] of Object.entries(this.nutrients)) {
        if (
          formatAmount(obj.nutrients[name].quantity, 3) !==
          formatAmount(value.quantity, 3)
        ) {
          console.log("C");
          return false;
        }
      }
    }
    // Servings
    if (this.servings !== obj.servings) {
      console.log("servings");
      return false;
    }
    // Serving Size
    if (
      this.servingSize.quantity !== obj.servingSize.quantity ||
      this.servingSize.unit !== obj.servingSize.unit
    ) {
      console.log("Serving size");
      return false;
    }
    // Prep Time
    if (this.prepTime !== obj.prepTime) {
      console.log("Prep time");
      return false;
    }
    // Cook Time
    if (this.cookTime !== obj.cookTime) {
      console.log("cook time");
      return false;
    }
    return true;
  }

  multiplyIngredients(multiplier) {
    if (multiplier < 0) {
      return null;
    }
    for (const ingredient of this.ingredients) {
      if (ingredient.quantity) {
        ingredient.quantity *= multiplier;
      }
    }
    return this;
  }

  multiplyNutrients(multiplier) {
    if (
      multiplier < 0 ||
      !this.nutrients ||
      !Object.keys(this.nutrients).length
    ) {
      return null;
    }
    for (const [name] of Object.entries(this.nutrients)) {
      if (this.nutrients[name].quantity) {
        this.nutrients[name].quantity *= multiplier;
      }
    }
    return this;
  }

  static formatNutrientObj(obj) {
    if (!obj || !Object.keys(obj).length) return null;
    const formattedObj = {};
    // Match numbers and vulgar fractions at start
    const numRE = /^([1-9][0-9]*|0)((\/[1-9][0-9]*)|(\.[0-9]*))?($|\s)/;
    for (const [key, val] of Object.entries(obj)) {
      // Object has already been formatted
      if (val.unit || val.quantity) return JSON.parse(JSON.stringify(obj));
      if (!val || key === "servingSize") continue;
      const quantity = val.match(numRE);
      // console.log(quantity);
      if (quantity && quantity[0].includes("/")) {
        quantity[0] = fraction(quantity[0].trim());
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
