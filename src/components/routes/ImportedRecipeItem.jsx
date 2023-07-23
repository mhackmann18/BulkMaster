import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import RecipeDisplay from "../RecipeItem/Display";
import User from "../../utils/UserController";
import RecipeForm from "../RecipeItem/Form";
import Recipe from "../../utils/Recipe";
import useRedirectOnAuthError from "../../hooks/useRedirectOnAuthError";
import useUser from "../../hooks/useUser";
import useToast from "../../hooks/useToast";
import Toast from "../common/Toast";
import Buttons from "../RecipeItem/Buttons";

export default function ImportedRecipeItem({ startRecipe }) {
  const [recipe, setRecipe] = useState(new Recipe({ ...startRecipe }));
  const [displayType, setDisplayType] = useState("div");
  const navigate = useNavigate();
  const redirectOnAuthError = useRedirectOnAuthError();
  const { user } = useUser();
  const { addErrorToastMessage, addSuccessToastMessage, toast, closeToast } =
    useToast();

  console.log(recipe);

  const handleSaveRecipeButtonClick = async () => {
    const { data, message, error } = await User.saveRecipe(recipe, user);

    redirectOnAuthError(error);

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
          setRootRecipe={(newRecipe) => setRecipe(new Recipe({ ...newRecipe }))}
          buttonsComponent={
            <Buttons
              buttonActions={{
                onBackClick: () => navigate(-1),
                onEditClick: () => setDisplayType("form"),
                onSaveRecipeClick: handleSaveRecipeButtonClick,
              }}
            />
          }
        />
      ) : (
        <RecipeForm
          startRecipe={recipe}
          onCancel={() => setDisplayType("div")}
          setStartRecipe={setRecipe}
        />
      )}
      <Toast state={toast} onClose={closeToast} />
    </>
  );
}

ImportedRecipeItem.propTypes = {
  startRecipe: PropTypes.instanceOf(Recipe).isRequired,
};
