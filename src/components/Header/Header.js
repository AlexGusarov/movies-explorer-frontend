import React from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import './Header.css';

function Header({ loggedIn, location }) {
  const isMainPage = (location === '');

  return (
    <header className={isMainPage ? 'header header_place_main' : 'header'}>
      <Logo />
      <Navigation loggedIn={loggedIn} isMainPage={isMainPage} />
    </header>
  )
}

export default Header;