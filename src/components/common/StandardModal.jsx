import PropTypes from "prop-types";
import { Modal, Fade } from "@mui/material";
import "./StandardModal.css";

export default function StandardModal({ open, setOpen, children }) {
  return (
    <Modal className="modal" open={open} onClose={() => setOpen(false)}>
      <Fade in={open}>
        <div className="modal-box">{children}</div>
      </Fade>
    </Modal>
  );
}

StandardModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
