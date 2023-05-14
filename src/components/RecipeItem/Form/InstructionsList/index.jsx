/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import RecipeValidator from "../../../../utils/RecipeValidator";
import "./index.css";

export default function InstructionsList({ instructions, register, errors }) {
  const textAreaContent = instructions.length ? instructions : [""];

  return (
    <ul id="instructions-list">
      {textAreaContent.map((el, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index}>
          <div className="instruction-input-wrapper">
            <TextField
              {...register(`instructions.${index}`, {
                validate: RecipeValidator.getInstructionErrMsg,
              })}
              defaultValue={el}
              label={`Step ${index + 1}`}
              variant="outlined"
              size="small"
              multiline
              fullWidth
              required
              helperText={
                errors.length ? errors[index] && errors[index].message : ""
              }
              error={Boolean(errors.length && errors[index])}
              minRows={1}
              maxRows={4}
            />
          </div>
          <FontAwesomeIcon
            icon={faTrashCan}
            size="lg"
            className="btn remove"
            title="Remove Step"
          />
        </li>
      ))}
    </ul>
  );
}

InstructionsList.propTypes = {
  instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.array,
};

InstructionsList.defaultProps = {
  errors: [],
};
