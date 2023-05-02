import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import Button from "../../common/Button";
import "./OpenCalculatorButton.css";

export default function SavedRecipeButtons({ switchToForm }) {
  const navigate = useNavigate(-1);

  return (
    <>
      <button type="button" id="open-calculator-button">
        <FontAwesomeIcon icon={faCalculator} size="lg" />
      </button>
      <Button text="Back" type="button" handleClick={() => navigate(-1)} />
      <Button text="Edit" type="button" handleClick={switchToForm} />
    </>
  );
}

SavedRecipeButtons.propTypes = {
  switchToForm: PropTypes.func.isRequired,
};
