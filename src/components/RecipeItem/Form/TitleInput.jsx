import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./TitleInput.css";
import RecipeValidator from "../../../utils/RecipeValidator";

export default function TitleInput({ value, errMsg, setErrMsg }) {
  const handleBlur = (e) => {
    // If the user focuses the field, then blurs without entering input, don't show them a required field err
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
      />
    </div>
  );
}

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
