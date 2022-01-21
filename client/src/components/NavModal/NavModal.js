import React from "react";
import { Link } from "react-router-dom";
import "./NavModal.scss";

function NavModal({ onToggle }) {
  return (
    <div className="nav">
      <Link to="/books" onClick={onToggle}>
        <div className="nav__item">Bookshelf</div>
      </Link>
      <Link to="/tracker" onClick={onToggle}>
        <div className="nav__item">Tracker</div>
      </Link>
      <Link to="/about" onClick={onToggle}>
        <div className="nav__item">About</div>
      </Link>
    </div>
  );
}

export default NavModal;
