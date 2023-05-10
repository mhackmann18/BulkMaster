import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./ServingsInput.css";
import RecipeValidator from "../../../utils/RecipeValidator";

export default function ServingsInput({ startingValue, errMsg, setErrMsg }) {
  const minServingsQuantity = 1;
  const maxServingsQuantity = 99;

  const handleBlur = (e) => {
    if (e.target.value) {
      setErrMsg(RecipeValidator.getServingsErrMsg(e.target.value));
    }
  };

  return (
    <div className="servings-input-wrapper">
      <TextField
        name="servings-quantity"
        type="number"
        defaultValue={startingValue || ""}
        label="Servings"
        variant="outlined"
        size="small"
        fullWidth
        onBlur={handleBlur}
        error={Boolean(errMsg)}
        helperText={errMsg}
        required
        InputProps={{
          inputProps: {
            min: minServingsQuantity,
            max: maxServingsQuantity,
          },
        }}
      />
    </div>
  );
}

ServingsInput.propTypes = {
  startingValue: PropTypes.number,
  errMsg: PropTypes.string,
  setErrMsg: PropTypes.func,
};

ServingsInput.defaultProps = {
  startingValue: 0,
  errMsg: "",
  setErrMsg: () => false,
};
