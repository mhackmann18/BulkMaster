import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";
import RecipeValidator from "../../../utils/RecipeValidator";
import "./TimeInput.css";

export default function TimeInput({
  name,
  labelText,
  defaultValue,
  errMsg,
  setErrMsg,
}) {
  const handleBlur = (e) => {
    if (e.target.value) {
      setErrMsg(RecipeValidator.getTimeErrMsg(e.target.value));
    } else {
      setErrMsg("");
    }
  };

  return (
    <div className="recipe-time-input-wrapper">
      <TextField
        name={name}
        type="number"
        defaultValue={defaultValue || ""}
        label={labelText}
        variant="outlined"
        size="small"
        fullWidth
        onBlur={handleBlur}
        InputProps={{
          endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
          inputProps: {
            min: RecipeValidator.timeMinValue,
            max: RecipeValidator.timeMaxValue,
          },
        }}
        error={Boolean(errMsg)}
        helperText={errMsg}
      />
    </div>
  );
}

TimeInput.propTypes = {
  defaultValue: PropTypes.number,
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  errMsg: PropTypes.string,
  setErrMsg: PropTypes.func,
};

TimeInput.defaultProps = {
  defaultValue: 0,
  errMsg: "",
  setErrMsg: () => "",
};
