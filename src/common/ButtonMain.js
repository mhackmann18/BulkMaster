import PropTypes from "prop-types";
import "./ButtonMain.css";

export default function ButtonMain({ text, onClick }) {
  return (
    <button onClick={onClick} className="btn-main">
      {text}
    </button>
  );
}

ButtonMain.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
