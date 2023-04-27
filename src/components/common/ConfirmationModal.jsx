import PropTypes from "prop-types";
import { Modal, Fade } from "@mui/material";
import "./ConfirmationModal.css";

export default function ConfirmationModal({
  open,
  headerText,
  messageText,
  cancelBtnText,
  confirmBtnText,
  onCancel,
  onConfirm,
}) {
  return (
    <Modal open={open} onClose={onCancel}>
      <Fade in={open}>
        <div className="modal-box">
          <h3>{headerText}</h3>
          <p>{messageText}</p>
          <div className="buttons-container">
            <button onClick={onCancel} className="btn-no-bg" type="button">
              {cancelBtnText}
            </button>
            <button
              onClick={onConfirm}
              className="btn-default btn-eerie-black"
              type="button"
            >
              {confirmBtnText}
            </button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  headerText: PropTypes.string.isRequired,
  messageText: PropTypes.string,
  cancelBtnText: PropTypes.string.isRequired,
  confirmBtnText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

ConfirmationModal.defaultProps = {
  messageText: "",
};
