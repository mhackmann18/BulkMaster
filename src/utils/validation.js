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
