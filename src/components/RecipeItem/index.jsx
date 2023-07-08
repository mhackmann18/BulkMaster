import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import RecipeDisplay from "./Display";
import RecipeForm from "./Form";
import Recipe from "../../utils/Recipe";

export default function RecipeItem({ startRecipe, startingDisplayType }) {
  const [recipe, setRecipe] = useState(new Recipe({ ...startRecipe }));
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
      startRecipe={recipe}
      switchToForm={() => setDisplayType("form")}
      setStartRecipe={setRecipe}
    />
  ) : (
    <RecipeForm
      startRecipe={recipe}
      onCancel={handleCancelButtonClick}
      setStartRecipe={setRecipe}
    />
  );
}

RecipeItem.propTypes = {
  startRecipe: PropTypes.instanceOf(Recipe).isRequired,
  startingDisplayType: PropTypes.oneOf(["form", "div"]),
};

RecipeItem.defaultProps = {
  startingDisplayType: "div",
};
