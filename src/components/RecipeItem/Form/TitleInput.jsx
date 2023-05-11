import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import RecipeValidator from "../../../utils/RecipeValidator";
import "./TitleInput.css";

const TitleInput = forwardRef(({ value, errMsg, setErrMsg }, ref) => {
  const handleBlur = (e) => {
    if (e.target.value) {
      setErrMsg(RecipeValidator.getTitleErrMsg(e.target.value));
    }
  };

  return (
    <div className="recipe-title-input-wrapper">
      <TextField
        id="recipe-title-input"
        name="recipe-title"
        defaultValue={value}
        label="Recipe Title"
        variant="outlined"
        size="large"
        onBlur={handleBlur}
        autoComplete="off"
        fullWidth
        error={Boolean(errMsg)}
        helperText={errMsg}
        required
        inputProps={{
          maxLength: RecipeValidator.titleMaxLength,
        }}
        inputRef={ref}
      />
    </div>
  );
});

TitleInput.propTypes = {
  value: PropTypes.string,
  errMsg: PropTypes.string,
  setErrMsg: PropTypes.func,
};

TitleInput.defaultProps = {
  value: "",
  errMsg: "",
  setErrMsg: () => false,
};

export default TitleInput;
