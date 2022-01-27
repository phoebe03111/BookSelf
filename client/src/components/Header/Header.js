import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";
import menuIcon from "../../assets/images/icons/menu-bars.svg";
import menuCloseIcon from "../../assets/images/icons/menu-close.svg";
import NavModal from "../NavModal/NavModal";
import { Button } from "@mui/material";
import "./Header.scss";

function Header() {
  const [showMenu, setshowMenu] = useState(false);

  const history = useHistory();

  const handleToggle = () => {
    setshowMenu(!showMenu);
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="header__logo-container">
        <Link to="/">
          <img src={logoImg} alt="logo" className="header__logo" />
        </Link>
      </div>

      {/* Navbar */}
      <nav className="header__nav--mobile">
        {showMenu && <NavModal onToggle={handleToggle} />}

        <div>
          <img
            src={showMenu ? menuCloseIcon : menuIcon}
            alt="menu"
            className="menu-icon"
            onClick={handleToggle}
          />
        </div>
      </nav>

      <nav className="header__nav">
        <ul className="header__nav-list">
          <Link to="/books">
            <li className="header__nav-item">Bookshelf</li>
          </Link>
          <Link to="/books/tracker">
            <li className="header__nav-item">Tracker</li>
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
        </ul>
      </nav>
    </header>
  );
}

export default Header;
