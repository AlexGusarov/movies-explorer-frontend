import './Burger.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import ProfileIcon from '../ProfileIcon/ProfileIcon';

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
    // evt.preventDefault();
    setIsActive(false);

    // if (evt.target.classList.contains('burger__link')) {
    //   setIsActive(false);
    // }
  }

  return (
    <>
      <div className={
        isActive
          ? 'burger-button burger-button_active'
          : 'burger-button'
      }
        onClick={toggleBurger}>
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
              // onClick={handleCloseMenu}
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