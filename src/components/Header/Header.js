import React from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import './Header.css';

function Header({ loggedIn }) {

  return (
    <header className={!loggedIn ? 'header header_place_main' : 'header'}>
      <Logo />
      <Navigation loggedIn={loggedIn} />
    </header>
  )
}

export default Header;