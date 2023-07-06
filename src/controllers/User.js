import dsd from "../utils/config";

export default class User {
  static async create(user) {
    const res = await fetch(`${dsd.ADDRESS}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    return data;
  }
}
