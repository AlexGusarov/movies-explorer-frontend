import './Burger.css';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProfileButton from '../ProfileButton/ProfileButton';
import { сlickOutside } from '../../utils/hooks';


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

  //закрыть кликом вне меню
  const burgerRef = useRef(null);
  сlickOutside(burgerRef, () => toggleBurger());

  return (
    <>
      <div className={
        isActive
          ? 'burger-button burger-button_active'
          : 'burger-button'
      } onClick={toggleBurger}
        ref={burgerRef}>
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
      <ul className={
        isActive
          ? 'burger__menu burger__menu_active'
          : 'burger__menu'
      }>
        <li className="burger__item">
          <Link className="burger__link" to="">Главная</Link>
        </li>
        <li className="burger__item">
          <Link className="burger__link" to="/movies">Фильмы</Link>
        </li>
        <li className="burger__item">
          <Link className="burger__link" to="/saved-movies">Сохраненные фильмы</Link>
        </li>
        <li className="burger__item">
          <Link className="burger__link" to="">{<ProfileButton />}</Link>
        </li>
      </ul>
    </>
  )
};

export default Burger;