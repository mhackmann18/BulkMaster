import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./NameInput.css";

export default function NameInput({ ingredientName }) {
  return (
    <div className="ingredient-name-input-wrapper">
      <TextField
        name="ingredient-name"
        defaultValue={ingredientName}
        label="Name"
        variant="outlined"
        size="small"
        fullWidth
        // error
        // helperText="Required Field"
      />
    </div>
  );
}

NameInput.propTypes = {
  ingredientName: PropTypes.string,
};

NameInput.defaultProps = {
  ingredientName: "",
};
