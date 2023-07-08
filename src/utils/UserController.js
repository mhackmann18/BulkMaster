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
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.username) {
      delete data.password;
    }

    return data;
  }

  static async getRecipes(token) {
    const res = await fetch(`${ADDRESS}/recipes`, {
      headers: {
        "x-access-token": token,
      },
    });

    const data = await res.json();

    return data;
  }

  static async getRecipe(recipeId, token) {
    const res = await fetch(`${ADDRESS}/recipes/${recipeId}`, {
      headers: {
        "x-access-token": token,
      },
    });

    const data = await res.json();

    return data;
  }

  static async getFromToken(token) {
    const res = await fetch(`${ADDRESS}/users/self`, {
      headers: {
        "x-access-token": token,
      },
    });

    const data = await res.json();

    return data;
  }

  static async saveRecipe(recipe, user) {
    const { id: userId, token } = user;

    const formattedRecipe = Recipe.prepareForExport(recipe, userId);

    const res = await fetch(`${ADDRESS}/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(formattedRecipe),
    });

    const data = await res.json();

    return data;
  }
}
