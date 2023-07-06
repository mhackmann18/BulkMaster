import config from "../utils/config";

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

    return data;
  }

  static async checkToken(token) {
    const res = await fetch(`${ADDRESS}/recipes`, {
      headers: {
        "x-access-token": token,
      },
    });

    return res.status === 200;
  }
}
