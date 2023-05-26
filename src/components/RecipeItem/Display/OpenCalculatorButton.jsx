import { useState } from "react";
import PropTypes from "prop-types";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import StandardModal from "../../common/StandardModal";
import MealPrepCalculatorForm from "./MealPrepCalculatorForm";
import "./OpenCalculatorButton.css";

export default function OpenCalculatorButton({
  recipeServingsCount,
  recipeCaloriesCount,
  recipeServingSize,
  onSubmit,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        id="open-calculator-button"
        onClick={() => setModalOpen(true)}
        type="button"
        className="btn-default"
      >
        {/* <FontAwesomeIcon icon={faCalculator} size="lg" /> */}
        Prep
      </button>
      <StandardModal open={modalOpen} handleClose={() => setModalOpen(false)}>
        <MealPrepCalculatorForm
          recipeServingsCount={recipeServingsCount}
          recipeCaloriesCount={recipeCaloriesCount}
          recipeServingSize={recipeServingSize}
          onCancelClick={() => setModalOpen(false)}
          onSubmit={(multiplier) => {
            onSubmit(multiplier);
            setModalOpen(false);
          }}
        />
      </StandardModal>
    </>
  );
}

OpenCalculatorButton.propTypes = {
  recipeServingsCount: PropTypes.number.isRequired,
  recipeCaloriesCount: PropTypes.number.isRequired,
  recipeServingSize: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
