import PropTypes from "prop-types";
import { Modal, Fade } from "@mui/material";
import "./CalculatorModal.css";

export default function CalculatorModal({ open }) {
  return (
    <Modal open={open} onClose={() => {}}>
      <Fade in={open}>
        <div className="modal-box">
          <div className="buttons-container" />
        </div>
      </Fade>
    </Modal>
  );
}

CalculatorModal.propTypes = {
  open: PropTypes.bool.isRequired,
};
