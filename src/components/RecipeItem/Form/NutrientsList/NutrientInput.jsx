import { useState } from "react";
import PropTypes from "prop-types";
import { TextField, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Nutrient from "../../../../utils/Nutrient";
import "./NutrientInput.css";

export default function NutrientInput({ nutrient }) {
  const { name, quantity, unit } = nutrient;
  const [unitInputLabelText, setUnitInputLabelText] = useState(
    unit ? `Quantity (${unit})` : "Quantity"
  );

  const handleNameInputChange = (e) => {
    for (const validNutrient of Nutrient.getValidNutrients()) {
      if (e.target.value === validNutrient.name) {
        setUnitInputLabelText(`Quantity (${validNutrient.unit})`);
      }
    }

    if (!e.target.value) {
      setUnitInputLabelText("Quantity");
    }
  };

  return (
    <div className="nutrient-inputs">
      <div className="nutrient-input-wrapper nutrient-name-input-wrapper">
        <TextField
          select
          size="small"
          label="Name"
          name="nutrient-name"
          defaultValue={name || ""}
          fullWidth
          onChange={handleNameInputChange}
        >
          {[{ name: "" }, ...Nutrient.getValidNutrients()].map((el) => (
            <MenuItem key={el.name} value={el.name}>
              {el.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="nutrient-input-wrapper nutrient-quantity-input-wrapper">
        <TextField
          name="nutrient-quantity"
          defaultValue={quantity || ""}
          variant="outlined"
          label={unitInputLabelText}
          size="small"
          fullWidth
          type="number"
          max={99999}
        />
      </div>
      <FontAwesomeIcon
        icon={faTrashCan}
        size="lg"
        className="btn"
        title="Remove Nutrient"
      />
    </div>
  );
}

NutrientInput.propTypes = {
  nutrient: PropTypes.instanceOf(Nutrient).isRequired,
};
