import PropTypes from "prop-types";
import "./RecipeContainer.css";

export default function RecipeContainer({
  nameComponent,
  timesComponent,
  buttonsPanelComponent,
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
        <div className="right">{buttonsPanelComponent}</div>
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
  timesComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.oneOf([null]),
  ]),
  buttonsPanelComponent: PropTypes.element.isRequired,
  ingredientsHeaderButtonComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.oneOf([null]),
  ]),
  ingredientsComponent: PropTypes.element.isRequired,
  instructionsHeaderButtonComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.oneOf([null]),
  ]),
  instructionsComponent: PropTypes.element.isRequired,
  nutrientsHeaderButtonComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.oneOf([null]),
  ]),
  nutrientsComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.oneOf([null]),
  ]),
};

RecipeContainer.defaultProps = {
  ingredientsHeaderButtonComponent: null,
  instructionsHeaderButtonComponent: null,
  nutrientsHeaderButtonComponent: null,
  nutrientsComponent: null,
  timesComponent: null,
};
