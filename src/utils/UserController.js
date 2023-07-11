import config from "./config";
import Recipe from "./Recipe";

const { ADDRESS } = config;

export default class UserController {
  static async create(user) {
    const res = await fetch(`${ADDRESS}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.username) {
      delete data.password;
    }

    return data;
  }

  static async login(user) {
    const res = await fetch(`${ADDRESS}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.username) {
      delete data.password;
    }

    return data;
  }

  static async update(userData, user) {
    const res = await fetch(`${ADDRESS}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...userData }),
    });

    const data = await res.json();

    return data;
  }

  static async getRecipes() {
    const res = await fetch(`${ADDRESS}/recipes`, {
      credentials: "include",
    });

    const data = await res.json();

    return data;
  }

  static async getRecipe(recipeId) {
    const res = await fetch(`${ADDRESS}/recipes/${recipeId}`, {
      credentials: "include",
    });

    const data = await res.json();

    return data;
  }

  static async getFromToken() {
    const res = await fetch(`${ADDRESS}/users/self`, {
      credentials: "include",
    });

    const data = await res.json();

    return data;
  }

  static async saveRecipe(recipe, user) {
    const { id: userId } = user;

    const formattedRecipe = Recipe.prepareForExport(recipe, userId);

    const res = await fetch(`${ADDRESS}/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedRecipe),
      credentials: "include",
    });

    const data = await res.json();

    return data;
  }

  static async updateRecipe(recipe, recipeId) {
    const formattedRecipe = Recipe.prepareForExport(recipe);

    const res = await fetch(`${ADDRESS}/recipes/${recipeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedRecipe),
      credentials: "include",
    });

    const data = await res.json();

    return data;
  }

  static async deleteRecipe(recipeId) {
    const res = await fetch(`${ADDRESS}/recipes/${recipeId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    return data;
  }
}
