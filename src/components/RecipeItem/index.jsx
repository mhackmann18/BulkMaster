import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import RecipeDisplay from "./Display";
import User from "../../utils/UserController";
import RecipeForm from "./Form";
import Recipe from "../../utils/Recipe";
import useRedirectOnAuthError from "../../hooks/useRedirectOnAuthError";
import useToast from "../../hooks/useToast";
import Toast from "../common/Toast";
import Buttons from "./Buttons";

export default function RecipeItem({ startRecipe, startingDisplayType }) {
  const [recipe, setRecipe] = useState(new Recipe({ ...startRecipe }));
  const [displayType, setDisplayType] = useState(startingDisplayType);
  const navigate = useNavigate();
  const redirectOnAuthError = useRedirectOnAuthError();
  const { addErrorToastMessage, toast, closeToast } = useToast();

  console.log(recipe);

  const handleCancelButtonClick = () => {
    if (startingDisplayType === "form") {
      navigate(-1);
    } else {
      setDisplayType("div");
    }
  };

  const updateRecipe = async (newRecipe) => {
    const { error, message } = await User.updateRecipe(newRecipe, recipe.id);

    if (error) {
      redirectOnAuthError(error);
      addErrorToastMessage(
        `Unable to update recipe servings. ${
          message || "An unexpected error occurred"
        }`
      );
      return;
    }

    setRecipe(new Recipe({ ...newRecipe }));
  };

  return (
    <>
      {displayType === "div" ? (
        <RecipeDisplay
          rootRecipe={recipe}
          setRootRecipe={updateRecipe}
          buttonsComponent={
            <Buttons
              buttonActions={{
                onBackClick: () => navigate(-1),
                onEditClick: () => setDisplayType("form"),
              }}
            />
          }
        />
      ) : (
        <RecipeForm
          startRecipe={recipe}
          onCancel={handleCancelButtonClick}
          setStartRecipe={setRecipe}
        />
      )}
      <Toast state={toast} onClose={closeToast} />
    </>
  );
}

RecipeItem.propTypes = {
  startRecipe: PropTypes.instanceOf(Recipe).isRequired,
  startingDisplayType: PropTypes.oneOf(["form", "div"]),
};

RecipeItem.defaultProps = {
  startingDisplayType: "div",
};
