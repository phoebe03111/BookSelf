import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/logo-1.png";
import menuIcon from "../../assets/images/icons/menu-bars.svg";
import menuCloseIcon from "../../assets/images/icons/menu-close.svg";
import "./Header.scss";

function Header() {
  const [showMenu, setshowMenu] = useState(false);

  let menu;

  if (showMenu) {
    menu = (
      <div className="header__menu">
        <Link to="/books">
          <div className="header__menu__item">Bookshelf</div>
        </Link>
        <div className="header__menu__item">Tracker</div>
        <div className="header__menu__item">Login</div>
      </div>
    );
  }

  return (
    <header className="header">
      {/* Logo */}
      <div className="header__logo-container">
        <Link to="/">
          <img src={logoImg} alt="logo" className="header__logo" />
        </Link>
      </div>

      {/* Navbar */}
      <nav className="header__nav">
        {menu}

        <div>
          <img
            src={showMenu ? menuCloseIcon : menuIcon}
            alt="menu"
            className="menu-icon"
            onClick={() => setshowMenu(!showMenu)}
          />
        </div>
      </nav>
    </header>
  );
}

export default Header;
