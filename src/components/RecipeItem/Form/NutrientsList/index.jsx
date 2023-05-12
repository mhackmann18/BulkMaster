/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import NutrientInput from "./Input";
import Recipe from "../../../../utils/Recipe";
import "./index.css";

export default function NutrientsList({ nutrients, register }) {
  return (
    <ul className="nutrients-list">
      {Recipe.getValidNutrientsArr().map(({ name, unit }) => (
        <li key={name}>
          <NutrientInput
            labelText={Recipe.getNutrientNameStringFromKey(name)}
            unit={unit}
            quantity={
              (nutrients && nutrients[name] && nutrients[name].quantity) || 0
            }
            {...register(`nutrients.${name}`)}
          />
        </li>
      ))}
    </ul>
  );
}

NutrientsList.propTypes = {
  nutrients: PropTypes.object,
  register: PropTypes.func.isRequired,
};

NutrientsList.defaultProps = {
  nutrients: null,
};
