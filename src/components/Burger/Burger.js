import './Burger.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import ProfileButton from '../ProfileButton/ProfileButton';

function Burger() {
  const [isActive, setIsActive] = useState(false);

  //открыть-закрыть боковое меню
  function toggleBurger() {
    if (isActive) {
      setIsActive(false)
    } else {
      setIsActive(true)
    }
  }

  function handleCloseMenu(evt) {
    if (evt.target.classList.contains('burger__link') || evt.target.classList.contains('burger__menu-container_active')) {
      setIsActive(false);
    }
  }

  return (
    <>
      <div className={
        isActive
          ? 'burger-button burger-button_active'
          : 'burger-button'
      } onClick={toggleBurger}

      >
        <span className={
          isActive
            ? 'burger-button__line burger-button__line_active'
            : 'burger-button__line'
        }></span>
        <span className={
          isActive
            ? 'burger-button__line burger-button__line_active'
            : 'burger-button__line'
        }></span>
        <span className={
          isActive
            ? 'burger-button__line burger-button__line_active'
            : 'burger-button__line'
        }></span>
      </div>
      <div className={
        isActive
          ? 'burger__menu-container burger__menu-container_active'
          : 'burger__menu-container'
      }>
        <ul className={
          isActive
            ? 'burger__menu burger__menu_active'
            : 'burger__menu'
        }
          onClick={handleCloseMenu}
        >
          <li className="burger__item">
            <NavLink
              to="/"
              // activeClassName="burger__link_active"
              className="burger__link" >Главная</NavLink>
          </li>
          <li className="burger__item">
            <NavLink
              to="/movies"
              // activeClassName="burger__link_active"
              className="burger__link" >Фильмы</NavLink>
          </li>
          <li className="burger__item">
            <NavLink
              to="/saved-movies"
              // activeClassName="burger__link_active"
              className="burger__link" >Сохраненные фильмы</NavLink>
          </li>
          <li className="burger__item">
            <NavLink
              to="/profile"
              // activeClassName="burger__link_active"
              className="burger__link" >{<ProfileButton />}</NavLink>
          </li>
        </ul>
      </div>
    </>
  )
};

export default Burger;