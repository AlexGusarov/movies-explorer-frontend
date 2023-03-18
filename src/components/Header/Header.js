import React from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Header() {

  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <div className="header__link-container">
        <Link to="/sign-up" className="header__link">Регистрация</Link>
        <Link to="/sign-in" className="header__link">Войти</Link>
      </div>
    </header>
  )
}

export default Header;