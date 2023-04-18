import PropTypes from "prop-types";
import "./ButtonMain.css";

export default function ButtonMain({ text, onClick }) {
  return (
    <button onClick={onClick} className="btn-main" type="submit">
      {text}
    </button>
  );
}

ButtonMain.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ButtonMain.defaultProps = {
  onClick: () => null,
};
