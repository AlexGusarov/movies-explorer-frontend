import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Header() {

  return (
    <header className="header header_main">
      <Logo />
      <div className="header__link-container">
        <Link to="/sign-up" className="header__link">Регистрация</Link>
        <Link to="/sign-in" className="header__link">Войти</Link>
      </div>
    </header>
  )
}

export default Header;