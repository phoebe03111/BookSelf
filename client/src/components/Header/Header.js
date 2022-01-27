import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";
import menuIcon from "../../assets/images/icons/menu-bars.svg";
import menuCloseIcon from "../../assets/images/icons/menu-close.svg";
import "./Header.scss";
import NavModal from "../NavModal/NavModal";

function Header() {
  const [showMenu, setshowMenu] = useState(false);

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
      <nav className="header__nav">
        {showMenu && <NavModal onToggle={handleToggle}/>}

        <div>
          <img
            src={showMenu ? menuCloseIcon : menuIcon}
            alt="menu"
            className="menu-icon"
            onClick={handleToggle}
          />
        </div>
      </nav>
    </header>
  );
}

export default Header;
