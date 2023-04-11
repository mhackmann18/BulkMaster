import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./AddButton.css";

export default function AddButton({ text }) {
  return (
    <button type="button" className="add-btn">
      <FontAwesomeIcon icon={faPlus} /> {text}
    </button>
  );
}

AddButton.propTypes = {
  text: PropTypes.string.isRequired,
};
