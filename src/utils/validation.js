import { usernameExists } from "./user";

export function isValidNumberInput(input, maxValue = Infinity, minValue = 0) {
  if (input === "") {
    return true;
  }
  if (
    /^[0-9]+$/.test(input) &&
    Number(input) <= maxValue &&
    Number(input) >= minValue
  ) {
    return true;
  }
  return false;
}

export function isValidHttpURL(string) {
  // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

export async function checkUsernameInput(username) {
  let isValid = false;
  let msg = "";

  if (!/^[a-zA-Z0-9_-]*$/.test(username)) {
    msg =
      "Username must only contain letters, numbers, dashes ( - ), and underscores ( _ )";
  } else if (username.length < 6) {
    msg = "Username must be at least 6 characters in length";
  } else if (username.length > 30) {
    msg = "Username must be no more than 30 character in length";
  } else if (await usernameExists(username)) {
    msg = "Username is already taken. Please choose a different username";
  } else {
    isValid = true;
  }

  return [isValid, msg];
}
