import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import RecipeDisplay from "./Display";
import RecipeForm from "./Form";
import Recipe from "../../utils/Recipe";

export default function RecipeItem({ recipe, startingDisplayType }) {
  const [displayType, setDisplayType] = useState(startingDisplayType);
  const navigate = useNavigate();

  console.log(recipe);

  const handleCancelButtonClick = () => {
    if (startingDisplayType === "form") {
      navigate(-1);
    } else {
      setDisplayType("div");
    }
  };

  return displayType === "div" ? (
    <RecipeDisplay
      recipe={recipe}
      switchToForm={() => setDisplayType("form")}
    />
  ) : (
    <RecipeForm
      startRecipe={recipe}
      handleCancelButtonClick={handleCancelButtonClick}
    />
  );
}

RecipeItem.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired,
  startingDisplayType: PropTypes.oneOf(["form", "div"]),
};

RecipeItem.defaultProps = {
  startingDisplayType: "div",
};
