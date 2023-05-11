import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./NameInput.css";

const NameInput = forwardRef(
  ({ ingredientName, name, onChange, onBlur }, ref) => {
    const maxCharacterLength = 99;

    return (
      <div className="ingredient-name-input-wrapper">
        <TextField
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={ingredientName}
          autoComplete="off"
          label="Name"
          variant="outlined"
          size="small"
          fullWidth
          required
          InputProps={{
            inputProps: { minLength: 1, maxLength: maxCharacterLength },
          }}
          inputRef={ref}
        />
      </div>
    );
  }
);

NameInput.propTypes = {
  ingredientName: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

NameInput.defaultProps = {
  ingredientName: "",
};

export default NameInput;
