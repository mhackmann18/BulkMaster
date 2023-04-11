import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import nutrientNames from "../utils/validNutrients";

export default function NutrientSelect({ nutrientName }) {
  return (
    <select
      className="nutrient-name"
      name="nutrient-name"
      title="Name"
      defaultValue={nutrientName}
    >
      {["", ...nutrientNames].map((el) => (
        <option value={el} key={uuidv4()}>
          {el}
        </option>
      ))}
    </select>
  );
}

NutrientSelect.propTypes = {
  nutrientName: PropTypes.oneOf([...nutrientNames]).isRequired,
};
