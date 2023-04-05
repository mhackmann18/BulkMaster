// May have an 's'
const standardFormUnits = [
  // Volume
  "milliliter",
  "teaspoon",
  "tablespoon",
  "ounce",
  "cup",
  "pint",
  "liter",
  "quart",
  "gallon",
  // Mass
  "milligram",
  "gram",
  "kilogram",
  "pound",
];

// May have an 's', an '.', or 's.'
const nonStandardFormUnits = [
  // Volume
  "ml",
  "tsp",
  "tbsp",
  "oz",
  "c",
  "pt",
  "l",
  "qt",
  "gal",
  // Mass
  "mg",
  "g",
  "kg",
  "lb",
];

export function isCookingUnit(str) {
  str = str.toLowerCase();

  for (let unit of standardFormUnits) {
    if (str === unit || str === unit + "s") {
      return true;
    }
  }

  for (let unit of nonStandardFormUnits) {
    if (
      str === unit ||
      str === unit + "s" ||
      str === unit + "." ||
      str === unit + "s."
    ) {
      return true;
    }
  }

  return false;
}

export function normalizeCookingUnit(str) {
  str = str.toLowerCase();

  for (let unit of standardFormUnits) {
    if (str === unit || str === unit + "s") {
      return unit;
    }
  }

  for (let unit of nonStandardFormUnits) {
    if (
      str === unit ||
      str === unit + "s" ||
      str === unit + "." ||
      str === unit + "s."
    ) {
      return standardFormUnits[nonStandardFormUnits.indexOf(unit)];
    }
  }

  return false;
}
