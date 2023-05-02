import PropTypes from "prop-types";
import { Modal, Fade } from "@mui/material";
import NumberInput from "../Form/NumberInput";
import "./CalculatorModal.css";

export default function CalculatorModal({ open, setOpen }) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Fade in={open}>
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <h2>Meal Prep Calculator</h2>
            <p>How many meals are you preparing?</p>
            <label htmlFor="meals-quantity">Number of Meals: </label>
            <NumberInput
              minValue={1}
              maxValue={99}
              name="meals-quantity"
              id="meals-quantity"
            />
            <p>How many calories should each meal contain?</p>
            <label htmlFor="calories-per-meal">Calories per Meal: </label>
            <NumberInput
              minValue={0}
              maxValue={9999}
              name="calories-per-meal"
              id="calories-per-meal"
            />
            <div className="buttons-container">
              <button
                className="btn-no-bg"
                onClick={() => setOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button className="btn-default" type="submit">
                Update Recipe
              </button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
}

CalculatorModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
