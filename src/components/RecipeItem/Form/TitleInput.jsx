import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./TitleInput.css";

const TitleInput = forwardRef(
  ({ errorMessage, name, onChange, onBlur }, ref) => (
    <div className="recipe-title-input-wrapper">
      <TextField
        id="recipe-title-input"
        label="Recipe Title"
        autoComplete="off"
        variant="outlined"
        size="large"
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        fullWidth
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        inputRef={ref}
      />
    </div>
  )
);

TitleInput.propTypes = {
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

TitleInput.defaultProps = {
  errorMessage: "",
};

export default TitleInput;
