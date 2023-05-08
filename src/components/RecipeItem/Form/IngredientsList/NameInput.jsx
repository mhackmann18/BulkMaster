import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./NameInput.css";

export default function NameInput({ ingredientName }) {
  const maxCharacterLength = 99;

  return (
    <div className="ingredient-name-input-wrapper">
      <TextField
        name="ingredient-name"
        defaultValue={ingredientName}
        label="Name"
        variant="outlined"
        size="small"
        fullWidth
        required
        InputProps={{
          inputProps: { minLength: 1, maxLength: maxCharacterLength },
        }}
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
