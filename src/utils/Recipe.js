import Ingredient from "./Ingredient";
import Nutrient from "./Nutrient";
// import Nutrient from "./Nutrient";

export default class Recipe {
  constructor({
    title,
    ingredients,
    instructions,
    nutrients,
    servings,
    prepTime,
    cookTime,
    url,
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
    this.servingSize = nutrients && nutrients.servingSize;
    this.prepTime = prepTime;
    this.cookTime = cookTime;
    this.url = url;
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
