import config from "../utils/config";
import Recipe from "../utils/Recipe";

const { ADDRESS } = config;

export default class User {
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

    // console.log(formattedRecipe);

    // console.log(JSON.stringify(formattedRecipe));

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
