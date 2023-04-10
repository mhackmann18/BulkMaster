import PropTypes from "prop-types";
import "./NameInput.css";

export default function RecipeNameInput({ value }) {
  return (
    <div id="recipe-name-input-wrapper">
      <label htmlFor="recipe-name">Name: </label>
      <input
        id="recipe-name-input"
        name="recipe-name"
        placeholder="Enter recipe name"
        defaultValue={value}
      />
    </div>
  );
}

RecipeNameInput.propTypes = {
  value: PropTypes.string,
};

RecipeNameInput.defaultProps = {
  value: "",
};
