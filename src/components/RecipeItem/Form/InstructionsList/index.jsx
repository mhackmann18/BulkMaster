/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import RecipeValidator from "../../../../utils/RecipeValidator";
import "./index.css";

export default function InstructionsList({
  instructions,
  onInstructionRemoveClick,
  register,
  errors,
}) {
  return (
    <ul id="instructions-list">
      {instructions.length
        ? instructions.map((el, index) => (
            <li key={el.id}>
              <div className="instruction-input-wrapper">
                <TextField
                  {...register(`instructions.${el.id}`, {
                    validate: RecipeValidator.getInstructionErrMsg,
                  })}
                  defaultValue={el.text}
                  label={`Step ${index + 1}`}
                  variant="outlined"
                  size="small"
                  multiline
                  fullWidth
                  required
                  helperText={errors && errors[el.id] && errors[el.id].message}
                  error={Boolean(errors && errors[el.id])}
                  minRows={1}
                  maxRows={4}
                />
              </div>
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => onInstructionRemoveClick(el.id)}
                size="lg"
                className="btn remove"
                title="Remove Step"
              />
            </li>
          ))
        : false}
    </ul>
  );
}

InstructionsList.propTypes = {
  instructions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInstructionRemoveClick: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

InstructionsList.defaultProps = {
  errors: null,
};
