import PropTypes from "prop-types";
import NutrientInput from "./Input";
import Recipe from "../../../../utils/Recipe";
import "./index.css";

export default function NutrientsList({ nutrients }) {
  return (
    <ul className="nutrients-list">
      {Recipe.getValidNutrientsArr().map(({ name, unit }) => (
        <li key={name}>
          <NutrientInput
            name={Recipe.getNutrientNameStringFromKey(name)}
            unit={unit}
            quantity={
              (nutrients && nutrients[name] && nutrients[name].quantity) || 0
            }
          />
        </li>
      ))}
    </ul>
  );
}

NutrientsList.propTypes = {
  nutrients: PropTypes.object,
};

NutrientsList.defaultProps = {
  nutrients: null,
};
