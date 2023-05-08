import PropTypes from "prop-types";
import NutrientInput from "./Input";
import Nutrient from "../../../../utils/Nutrient";
import "./index.css";

export default function NutrientsList({ nutrients }) {
  const getNutrientListItem = (el) => {
    for (const nutrient of nutrients) {
      if (el.name === nutrient.name) {
        return (
          <li key={nutrient.name}>
            <NutrientInput nutrient={nutrient} />
          </li>
        );
      }
    }

    return (
      <li key={el.name}>
        <NutrientInput nutrient={new Nutrient(el)} />
      </li>
    );
  };

  return (
    <ul className="nutrients-list">
      {Nutrient.getValidNutrients().map(getNutrientListItem)}
    </ul>
  );
}

NutrientsList.propTypes = {
  nutrients: PropTypes.arrayOf(PropTypes.instanceOf(Nutrient)).isRequired,
};
