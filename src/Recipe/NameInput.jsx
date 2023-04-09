import PropTypes from "prop-types";

export default function RecipeNameInput({ value }) {
  return (
    <input
      id="recipe-name-input"
      placeholder="Enter recipe name"
      value={value}
    />
  );
}

RecipeNameInput.propTypes = {
  value: PropTypes.string,
};

RecipeNameInput.defaultProps = {
  value: "",
};
