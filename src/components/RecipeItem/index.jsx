import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import RecipeDisplay from "./Display";
import User from "../../utils/UserController";
import RecipeForm from "./Form";
import Recipe from "../../utils/Recipe";
import useHandleAuthError from "../../hooks/useHandleAuthError";
import useUser from "../../hooks/useUser";
import useToast from "../../hooks/useToast";
import Toast from "../common/Toast";
import Buttons from "./Buttons";

export default function RecipeItem({ startRecipe, startingDisplayType }) {
  const [recipe, setRecipe] = useState(new Recipe({ ...startRecipe }));
  const [displayType, setDisplayType] = useState(startingDisplayType);
  const navigate = useNavigate();
  const handleAuthError = useHandleAuthError();
  const { user } = useUser();
  const { addErrorToastMessage, addSuccessToastMessage, toast, closeToast } =
    useToast();

  const recipeStatus = recipe.id ? "saved" : "imported";

  console.log(recipe);

  const handleCancelButtonClick = () => {
    if (startingDisplayType === "form") {
      navigate(-1);
    } else {
      setDisplayType("div");
    }
  };

  const updateRecipe = async (newRecipe) => {
    setRecipe(new Recipe({ ...newRecipe }));

    if (recipeStatus === "saved") {
      const { error, message } = await User.updateRecipe(newRecipe, recipe.id);
      handleAuthError(error);
      if (error) {
        // Show error modal here
        addErrorToastMessage(
          `Unable to update recipe servings. ${
            message || "An unexpected error occurred"
          }`
        );
        setRecipe(new Recipe({ ...startRecipe }));
      }
    }
  };

  const handleSaveButtonClick = async () => {
    // TODO: add loading indicator
    const { data, message, error } = await User.saveRecipe(recipe, user);

    handleAuthError(error);

    // Error
    if (message) {
      addErrorToastMessage(
        `Unable to save recipe. ${message || "An unexpected error occurred"}`
      );
    }
    // Success
    else if (data) {
      addSuccessToastMessage("Recipe added to library");
    }
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
                ...(recipeStatus === "imported" && {
                  onSaveRecipeClick: handleSaveButtonClick,
                }),
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
