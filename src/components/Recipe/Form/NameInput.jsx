import PropTypes from "prop-types";
import "./NameInput.css";

export default function RecipeNameInput({ value }) {
  return (
    <div id="recipe-name-input-wrapper">
      <input id="recipe-name-input" name="recipe-name" defaultValue={value} />
    </div>
  );
}

RecipeNameInput.propTypes = {
  value: PropTypes.string,
};

RecipeNameInput.defaultProps = {
  value: "",
};
