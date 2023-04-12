import PropTypes from "prop-types";

export default function RecipeTimesDisplay({ prepTime, cookTime }) {
  if (!prepTime && !cookTime) {
    return false;
  }
  return (
    <p id="recipe-times">
      {prepTime && `Prep Time: ${prepTime} minutes`}
      {prepTime && cookTime && " | "}
      {cookTime && `Cook Time: ${cookTime} minutes`}
    </p>
  );
}

RecipeTimesDisplay.propTypes = {
  prepTime: PropTypes.number,
  cookTime: PropTypes.number,
};

RecipeTimesDisplay.defaultProps = {
  prepTime: 0,
  cookTime: 0,
};
