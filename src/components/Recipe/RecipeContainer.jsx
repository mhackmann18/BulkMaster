import PropTypes from "prop-types";
import "./RecipeContainer.css";

export default function RecipeContainer({
  nameComponent,
  timesComponent,
  ingredientsHeaderButtonComponent,
  ingredientsComponent,
  instructionsHeaderButtonComponent,
  instructionsComponent,
  nutrientsHeaderButtonComponent,
  nutrientsComponent,
}) {
  return (
    <>
      <header id="recipe-header">
        <div className="left">
          {nameComponent}
          <div className="row">{timesComponent}</div>
        </div>
        <div className="right">
          <button id="recipe-cancel-btn" className="btn-onyx" type="button">
            Cancel
          </button>
          <button id="recipe-save-btn" className="btn-onyx" type="submit">
            Save
          </button>
        </div>
      </header>
      <div id="recipe-content" className="two-col">
        <div id="ingredients-container">
          <h3>Ingredients {ingredientsHeaderButtonComponent}</h3>
          {ingredientsComponent}
        </div>
        <div id="instructions-container">
          <h3 id="instructions-header">
            Instructions {instructionsHeaderButtonComponent}
          </h3>
          {instructionsComponent}

          {nutrientsComponent && (
            <h3 id="nutrition-facts-header">
              Nutrition Facts {nutrientsHeaderButtonComponent}
            </h3>
          )}
          {nutrientsComponent}
        </div>
      </div>
    </>
  );
}

RecipeContainer.propTypes = {
  nameComponent: PropTypes.element.isRequired,
  timesComponent: PropTypes.element,
  ingredientsHeaderButtonComponent: PropTypes.element,
  ingredientsComponent: PropTypes.element.isRequired,
  instructionsHeaderButtonComponent: PropTypes.element,
  instructionsComponent: PropTypes.element.isRequired,
  nutrientsHeaderButtonComponent: PropTypes.element,
  nutrientsComponent: PropTypes.element,
};

RecipeContainer.defaultProps = {
  ingredientsHeaderButtonComponent: false,
  instructionsHeaderButtonComponent: false,
  nutrientsHeaderButtonComponent: false,
  nutrientsComponent: false,
  timesComponent: false,
};
