import { fraction } from "mathjs";

export default class Nutrient {
  constructor(nutrient) {
    if (typeof nutrient === "string") {
      // Write a function for converting nutrient strings to objects
      const { name, quantity, unit } =
        Nutrient.getNutrientObjectFromString(nutrient);

      this.name = name;
      this.quantity = quantity;
      this.unit = unit;
    } else if (typeof nutrient === "object") {
      this.name = nutrient.name;
      this.quantity = nutrient.quantity;
      this.unit = nutrient.unit;
    }
  }

  getString() {
    return `${this.name}: ${this.quantity} ${this.unit}`.trim();
  }

  static getNutrientObjectFromString(str) {
    const nutrientNameRegex = /^[^:]+/;
    const name = str.match(nutrientNameRegex)[0];

    const positiveIntRegex = /\d+/;
    const quantityStr = str.match(positiveIntRegex)[0];

    const lastToken = str.split(" ").at(-1);

    return {
      name,
      quantity: Number(quantityStr),
      unit: ["g", "mg", "kcal"].includes(lastToken) ? lastToken : "",
    };
  }

  static getNutrientsArrayFromScrapedObject(obj) {
    if (!obj || !Object.keys(obj).length) return null;

    const nutrients = [];

    // Match numbers and vulgar fractions at start
    const numRE = /^([1-9][0-9]*|0)((\/[1-9][0-9]*)|(\.[0-9]*))?($|\s)/;

    for (const [key, val] of Object.entries(obj)) {
      if (!val || key === "servingSize") continue;

      const quantity = val.match(numRE);

      let unit = val.replace(numRE, "");

      unit = unit.trim() || "";

      if (quantity && quantity[0].includes("/")) {
        quantity[0] = fraction(quantity[0]);
      }

      let name = key.replace("Content", "");
      name = name.charAt(0).toUpperCase() + name.slice(1);
      const nameWords = name.match(/[A-Z][a-z]+/g);
      const nameStr = nameWords.reduce(
        (acc, el, i) =>
          i + 1 !== nameWords.length ? `${acc + el} ` : acc + el,
        ""
      );

      nutrients.push({
        name: nameStr,
        quantity: quantity ? Number(quantity[0]) : null,
        unit,
      });
    }

    return nutrients;
  }
}
