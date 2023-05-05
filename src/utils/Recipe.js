import Ingredient from "./Ingredient";

export default class Recipe {
  constructor({
    title,
    ingredients,
    instructions,
    nutrients,
    yields,
    prepTime,
    cookTime,
    url,
  }) {
    this.title = title;
    this.ingredients = ingredients.length
      ? ingredients.map((ingredient) => new Ingredient(ingredient))
      : [];
    this.instructions = instructions;
    this.nutrients = nutrients;
    this.yields = yields;
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
