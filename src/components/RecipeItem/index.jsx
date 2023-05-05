import { useState } from "react";
import PropTypes from "prop-types";
// import RecipeDisplay from "./Display";
import RecipeForm from "./Form";
import Recipe from "../../utils/Recipe";

export default function RecipeItem({ recipe, startingDisplayType }) {
  const [displayType, setDisplayType] = useState(startingDisplayType);

  console.log(recipe.ingredients);

  return displayType === "div" ? (
    // <RecipeDisplay
    //   recipe={recipe}
    //   switchToForm={() => setDisplayType("form")}
    // />
    <span>{recipe.title}</span>
  ) : (
    <RecipeForm
      // recipe={recipe}
      switchToDiv={() => setDisplayType("div")}
    />
  );
}

RecipeItem.propTypes = {
  recipe: PropTypes.instanceOf(Recipe),
  startingDisplayType: PropTypes.oneOf(["form", "div"]),
};

RecipeItem.defaultProps = {
  recipe: new Recipe({
    title: "",
    ingredients: [],
    instructions: [],
    nutrients: null,
    yields: "",
    prepTime: 0,
    cookTime: 0,
    url: "",
  }),
  startingDisplayType: "div",
};
