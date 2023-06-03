import './Burger.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import ProfileIcon from '../ProfileIcon/ProfileIcon';

function Burger({ isMainPage }) {
  const [isActive, setIsActive] = useState(false);

  //открыть-закрыть боковое меню
  function toggleBurger() {
    if (isActive) {
      setIsActive(false)
    } else {
      setIsActive(true)
    }
  }

  function handleCloseMenu() {
    setIsActive(false);
  }

  const buttonLineClass = `burger-button__line 
  ${isMainPage && !isActive && 'burger-button__line_place_main'}
  ${isActive && 'burger-button__line_active'}`

  return (
    <>
      <div className={`burger-button ${isActive && 'burger-button_active'}`}
        onClick={toggleBurger}>
        <span className={buttonLineClass}></span>
        <span className={buttonLineClass}></span>
        <span className={buttonLineClass}></span>
      </div>
      <div
        className={
          `burger__menu-container 
        ${isActive && 'burger__menu-container_active'
          }`}>
        <ul className={`burger__menu ${isActive && 'burger__menu_active'}`}
          onClick={handleCloseMenu}
        >
          <li className="burger__item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "burger__link burger__link_active" : "burger__link"
              } >Главная</NavLink>
          </li>
          <li className="burger__item">
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive ? "burger__link burger__link_active" : "burger__link"
              }>Фильмы</NavLink>
          </li>
          <li className="burger__item">
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                isActive ? "burger__link burger__link_active" : "burger__link"
              }>Сохраненные фильмы</NavLink>
          </li>
          <li className="burger__item">
            <NavLink
              to="/profile"
              className="burger__link">
              {<ProfileIcon />}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
};

export default Burger;