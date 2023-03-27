import React from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";


function Header({ loggedIn }) {


  return (
    <header className={!loggedIn ? 'header header_main' : 'header'}>
      <Logo />
      <Navigation loggedIn={loggedIn} />
    </header>
  )
}

export default Header;