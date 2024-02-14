import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./ImageModal.css";

export default function ImageModal({ open, setOpen, image }) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="imgmodaldiv">
          <img className="imgmodaldivimg" src={image} />
        </div>
      </Modal>
    </div>
  );
}
