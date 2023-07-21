import PropTypes from "prop-types";
import Recipe from "../utils/Recipe";
import RecipeDisplay from "./RecipeItem/Display";
import RecipeItemButtons from "./RecipeItem/Buttons";

// Component is intended to be used when no user is logged in
export default function HomeRecipeItem({
  recipe,
  onBackClick,
  openLoginModal,
}) {
  const buttonActions = {
    onBackClick,
    onEditClick: openLoginModal,
    onSaveRecipeClick: openLoginModal,
  };

  return (
    <RecipeDisplay
      startRecipe={recipe}
      buttonsComponent={<RecipeItemButtons buttonActions={buttonActions} />}
    />
  );
}

HomeRecipeItem.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired,
  onBackClick: PropTypes.func.isRequired,
  openLoginModal: PropTypes.func.isRequired,
};
