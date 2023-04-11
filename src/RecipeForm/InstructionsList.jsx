import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import "./InstructionsList.css";

export default function InstructionsList({ instructions }) {
  return (
    <ol className="instructions-list">
      {instructions.map((el) => (
        <li key={uuidv4()}>
          <FontAwesomeIcon
            icon={faCircleMinus}
            size="lg"
            className="btn remove"
            title="Remove Item"
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
