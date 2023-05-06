import PropTypes from "prop-types";
import { TextareaAutosize } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import "./index.css";

export default function InstructionsList({ instructions }) {
  const textAreaContent = instructions.length ? instructions : [""];

  return (
    <ul id="instructions-list">
      {textAreaContent.map((el, index) => (
        <li key={uuidv4()}>
          <span className="instruction-number">{index + 1}. </span>
          <TextareaAutosize
            maxRows={4}
            minRows={1}
            type="text"
            defaultValue={el}
            name="instruction"
          />
          {/* <div className="instruction-remove-btn-wrapper"> */}
          <FontAwesomeIcon
            icon={faTrashCan}
            size="lg"
            className="btn remove"
            title="Remove Step"
          />
          {/* </div> */}
        </li>
      ))}
    </ul>
  );
}

InstructionsList.propTypes = {
  instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
};
