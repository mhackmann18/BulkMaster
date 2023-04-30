import PropTypes from "prop-types";
import "./Button.css";

export default function Button({ text, handleClick, variant }) {
  return (
    <button onClick={handleClick} className={variant} type="button">
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
};

Button.defaultProps = {
  variant: "default",
};
