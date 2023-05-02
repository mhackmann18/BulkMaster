import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import CalculatorModal from "./CalculatorModal";
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
      <CalculatorModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
