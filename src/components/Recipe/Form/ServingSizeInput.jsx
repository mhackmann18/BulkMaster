import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./ServingSizeInput.css";

export default function ServingSizeInput({ servingSize }) {
  // function getQuantityFromServingsString(str) {
  //   const numRE = /^([1-9][0-9]*|0)((\/[1-9][0-9]*)|(\.[0-9]*))?($|\s)/;
  //   const match = str.match(numRE);

  //   let unit = servingSize.replace(numRE, "");
  //   unit = unit.trim();

  //   return { quantity: match ? Number(match[0]) : "", unit };
  // }

  // const { quantity, unit } = getQuantityFromServingsString(servingSize);

  return (
    <div className="serving-size-input-wrapper">
      <TextField
        name="serving-size"
        defaultValue={servingSize || ""}
        label="Serving Size"
        variant="outlined"
        size="small"
        fullWidth
        // error
        // helperText="Required Field"
      />
    </div>
  );
}

ServingSizeInput.propTypes = {
  servingSize: PropTypes.string,
  // servings: PropTypes.number,
};

ServingSizeInput.defaultProps = {
  servingSize: "",
  // servings: 1,
};
