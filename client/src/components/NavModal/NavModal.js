import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import "./NavModal.scss";

function NavModal({ onToggle }) {
  const history = useHistory();
  return (
    <div className="nav">
      <Link to="/books" onClick={onToggle}>
        <div className="nav__item">Bookshelf</div>
      </Link>

      <Link to="/books/tracker" onClick={onToggle}>
        <div className="nav__item">Tracker</div>
      </Link>

      <Button
        type="submit"
        color="success"
        variant="contained"
        onClick={() => {
          sessionStorage.removeItem("token");
          history.push("/");
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default NavModal;
