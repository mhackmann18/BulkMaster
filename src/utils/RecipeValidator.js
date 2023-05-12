export default class RecipeValidator {
  // Error messages
  static requiredFieldMsg = "Required field";

  // Field requirements
  static titleMaxLength = 99;

  static servingsMaxValue = 99;

  static servingsMinValue = 1;

  static timeMaxValue = 999;

  static timeMinValue = 1;

  static ingredientNameMaxLength = 99;

  static instructionMaxLength = 9999;

  static getTitleErrMsg(str) {
    let msg = "";

    const trimmedStr = str.trim();
    if (!trimmedStr.length) {
      msg = RecipeValidator.requiredFieldMsg;
    } else if (trimmedStr.length > RecipeValidator.titleMaxLength) {
      msg = `Recipe title must be less than ${
        RecipeValidator.titleMaxLength + 1
      } characters in length`;
    }

    return msg || true;
  }

  static getServingsErrMsg(str) {
    return RecipeValidator.getIntegerErrMsg(
      str,
      RecipeValidator.servingsMaxValue,
      RecipeValidator.servingsMinValue,
      true
    );
  }

  static getTimeErrMsg(str) {
    return RecipeValidator.getIntegerErrMsg(
      str,
      RecipeValidator.timeMaxValue,
      RecipeValidator.timeMinValue
    );
  }

  static getIngredientQuantityErrMsg(str) {
    return RecipeValidator.getNumberErrMsg(str, 9999);
  }

  static getIngredientNameErrMsg(str) {
    let msg = "";

    const trimmedStr = str.trim();
    if (!trimmedStr.length) {
      msg = RecipeValidator.requiredFieldMsg;
    } else if (trimmedStr.length > RecipeValidator.ingredientNameMaxLength) {
      msg = `Ingredient name must be less than ${
        RecipeValidator.ingredientNameMaxLength + 1
      } characters in length`;
    }

    return msg || true;
  }

  static getInstructionErrMsg(str) {
    let msg = "";

    const trimmedStr = str.trim();
    if (!trimmedStr.length) {
      msg = "Step field must contain some text";
    } else if (trimmedStr.length > RecipeValidator.instructionMaxLength) {
      msg = `Step content must be less than ${
        RecipeValidator.instructionMaxLength + 1
      } characters in length`;
    }

    return msg || true;
  }

  static getNumberErrMsg(str, maxValue, minValue = 0, required = false) {
    let msg = "";
    const number = Number(str);

    if (!str && !required) {
      return true;
    }

    if (!str && required) {
      msg = RecipeValidator.requiredFieldMsg;
    } else if (Number.isNaN(number)) {
      msg = "Please enter a number";
    } else if (number > maxValue) {
      msg = `Please enter a number less than ${maxValue + 1}`;
    } else if (number < minValue) {
      msg = `Please enter a number greater than or equal to ${minValue}`;
    }

    return msg || true;
  }

  static getIntegerErrMsg(str, maxValue, minValue = 0, required = false) {
    let msg = "";

    if (!str && !required) {
      return true;
    }

    const number = Number(str);

    if (!str && required) {
      msg = RecipeValidator.requiredFieldMsg;
    } else if (Number.isNaN(number)) {
      msg = "Please enter an integer";
    } else if (number % 1 !== 0) {
      msg = "Please enter an integer";
    } else if (number > maxValue) {
      msg = `Please enter an integer less than ${maxValue + 1}`;
    } else if (number < minValue) {
      msg = `Please enter an integer greater than or equal to ${minValue}`;
    }

    return msg || true;
  }
}
