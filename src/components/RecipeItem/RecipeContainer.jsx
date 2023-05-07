import PropTypes from "prop-types";
import "./RecipeContainer.css";

export default function RecipeContainer({
  titleComponent,
  subHeadingComponent,
  buttonsComponent,
  ingredientsHeaderButtonComponent,
  ingredientsComponent,
  instructionsHeaderButtonComponent,
  instructionsComponent,
  nutrientsHeaderButtonComponent,
  nutrientsComponent,
}) {
  return (
    <div className="recipe-container">
      <header id="recipe-header">
        <div className="left">
          {titleComponent}
          <div className="row">{subHeadingComponent}</div>
        </div>
        <div className="right">{buttonsComponent}</div>
      </header>
      <div id="recipe-content" className="two-col">
        <div id="ingredients-container">
          <h3>Ingredients</h3>
          {ingredientsComponent}
          {ingredientsHeaderButtonComponent}
        </div>
        <div id="instructions-container">
          <h3 id="instructions-header">Instructions</h3>
          {instructionsComponent}
          {instructionsHeaderButtonComponent}

          {nutrientsComponent && (
            <h3 id="nutrition-facts-header">Nutrition Facts</h3>
          )}
          {nutrientsComponent}
          {nutrientsHeaderButtonComponent}
        </div>
      </div>
    </div>
  );
}

RecipeContainer.propTypes = {
  titleComponent: PropTypes.element.isRequired,
  subHeadingComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.oneOf([null]),
  ]),
  buttonsComponent: PropTypes.node.isRequired,
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
  subHeadingComponent: null,
  ingredientsHeaderButtonComponent: null,
  instructionsHeaderButtonComponent: null,
  nutrientsHeaderButtonComponent: null,
  nutrientsComponent: null,
};
