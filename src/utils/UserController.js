/* eslint-disable no-promise-executor-return */
import config from "./config";
import Recipe from "./Recipe";

const { ADDRESS } = config;

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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

    const json = await res.json();

    if (json.data?.password) {
      delete json.data.password;
    }

    return json;
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

    const json = await res.json();

    if (json.data?.password) {
      delete json.data.password;
    }

    return json;
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

    const json = await res.json();

    return json;
  }

  static async getRecipes() {
    const res = await fetch(`${ADDRESS}/recipes`, {
      credentials: "include",
    });

    const json = await res.json();

    return json;
  }

  static async getRecipe(recipeId) {
    const res = await fetch(`${ADDRESS}/recipes/${recipeId}`, {
      credentials: "include",
    });

    const json = await res.json();

    return json;
  }

  static async getFromToken() {
    const res = await fetch(`${ADDRESS}/users/self`, {
      credentials: "include",
    });

    const json = await res.json();

    if (json.data?.password) delete json.data.password;

    return json;
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

    const json = await res.json();

    return json;
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

    const json = await res.json();

    return json;
  }

  static async deleteRecipe(recipeId) {
    const res = await fetch(`${ADDRESS}/recipes/${recipeId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const json = await res.json();

    return json;
  }

  static async deleteUser(userId) {
    const res = await fetch(`${ADDRESS}/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const json = await res.json();

    return json;
  }
}
