import Ingredient from "./Ingredient";
import Nutrient from "./Nutrient";
import {
  getNumberFromNumericalString,
  isStringPositiveNumber,
} from "./helperFunctions";

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
    url, // string
    id, // a number greater than 0 or a fasly
  }) {
    this.title = title;
    this.ingredients = ingredients.length
      ? ingredients.map((ingredient) => new Ingredient(ingredient))
      : [];
    this.instructions = instructions;
    if (Array.isArray(nutrients)) {
      this.nutrients = nutrients.map((nutrient) => new Nutrient(nutrient));
    } else if (typeof nutrients === "object") {
      this.nutrients = Nutrient.getNutrientsArrayFromScrapedObject(
        nutrients
      ).map((nutrient) => new Nutrient(nutrient));
    }
    this.servings =
      typeof servings === "number" ? servings : Number(servings.split(" ")[0]);
    this.servingSize =
      servingSize ||
      Recipe.servingSizeStringToObject(nutrients && nutrients.servingSize);
    this.prepTime = prepTime;
    this.cookTime = cookTime;
    this.url = url;
    if (id) {
      this.id = id;
    }
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
