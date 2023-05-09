import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import "./index.css";

export default function InstructionsList({ instructions }) {
  const maxLength = 10000;
  const textAreaContent = instructions.length ? instructions : [""];

  return (
    <ul id="instructions-list">
      {textAreaContent.map((el, index) => (
        <li key={uuidv4()}>
          {/* <span className="instruction-number">{index + 1}. </span> */}
          <div className="instruction-input-wrapper">
            <TextField
              name="instruction"
              defaultValue={el}
              label={`Step ${index + 1}`}
              variant="outlined"
              size="small"
              fullWidth
              multiline
              minRows={1}
              maxRows={4}
              // rows={4}
              maxLength={maxLength}
            />
            {/* <TextareaAutosize
            maxRows={4}
            minRows={1}
            type="text"
            defaultValue={el}
            required
            maxLength={maxLength}
            name="instruction"
          /> */}
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
};
