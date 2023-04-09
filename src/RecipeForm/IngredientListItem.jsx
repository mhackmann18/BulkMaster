import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import SubIngredient from "./SubIngredient";
import Ingredient from "../utils/Ingredient";

export default function IngredientListItem({ ingredient }) {
  const ing = new Ingredient(ingredient);
  const ingredientObjects = ing.getIngredientObjects();

  return (
    <>
      {ingredientObjects.map((el) => (
        <SubIngredient key={uuidv4()} subIngredient={el} />
      ))}
    </>
  );
}

IngredientListItem.propTypes = {
  ingredient: PropTypes.string.isRequired,
};
