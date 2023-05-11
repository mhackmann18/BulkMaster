/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import "./index.css";

export default function InstructionsList({ instructions, register }) {
  const maxLength = 10000;
  const textAreaContent = instructions.length ? instructions : [""];

  return (
    <ul id="instructions-list">
      {textAreaContent.map((el, index) => (
        <li key={uuidv4()}>
          <div className="instruction-input-wrapper">
            <TextField
              {...register(`instructions.${index}`)}
              defaultValue={el}
              label={`Step ${index + 1}`}
              variant="outlined"
              size="small"
              fullWidth
              multiline
              minRows={1}
              maxRows={4}
              maxLength={maxLength}
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
  // errors: PropTypes.object.isRequired,
};
