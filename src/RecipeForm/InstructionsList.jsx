import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import "./InstructionsList.css";

export default function InstructionsList({ instructions }) {
  return (
    <ol className="instructions-list">
      {instructions.map((el) => (
        <li key={uuidv4()}>
          <FontAwesomeIcon
            icon={faTrashCan}
            size="lg"
            className="btn remove"
            title="Remove Step"
          />
          <textarea type="text" defaultValue={el} />
        </li>
      ))}
    </ol>
  );
}

InstructionsList.propTypes = {
  instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
};
