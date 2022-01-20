import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";
import menuIcon from "../../assets/images/icons/menu-bars.svg";
import menuCloseIcon from "../../assets/images/icons/menu-close.svg";
import "./Header.scss";

function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuIsOpen(!menuIsOpen);
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
      <nav className="header__nav">
        <div className={menuIsOpen ? "header__menu" : "header__menu--hidden"}>
          <Link to="/books">
            <div>Bookshelf</div>
          </Link>
          <div>Tracker</div>
          <div>Login</div>
        </div>

        <div>
          <img
            src={menuIsOpen ? menuCloseIcon : menuIcon}
            alt="menu"
            className="menu-icon"
            onClick={handleMenuOpen}
          />
        </div>
      </nav>
    </header>
  );
}

export default Header;
