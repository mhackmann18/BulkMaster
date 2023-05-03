import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import StandardModal from "../../common/StandardModal";
import MealPrepCalculatorForm from "./MealPrepCalculatorForm";
import "./OpenCalculatorButton.css";

export default function OpenCalculatorButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        id="open-calculator-button"
        onClick={() => setModalOpen(true)}
        type="button"
      >
        <FontAwesomeIcon icon={faCalculator} size="lg" />
      </button>
      <StandardModal open={modalOpen} handleClose={() => setModalOpen(false)}>
        <MealPrepCalculatorForm />
      </StandardModal>
    </>
  );
}
