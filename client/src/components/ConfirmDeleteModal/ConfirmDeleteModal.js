import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import "./ConfirmDeleteModal.scss";

function ConfirmDeleteModal({ bookId, onDelete }) {
  const [open, setOpen] = useState(true);

  let history = useHistory();

  const handleDelete = () => {
    const token = sessionStorage.getItem("token");
    axios
      .delete(`https://bookself-server.herokuapp.com/books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        history.push("/books");
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setOpen(false);
    onDelete(false)
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDeleteModal;
