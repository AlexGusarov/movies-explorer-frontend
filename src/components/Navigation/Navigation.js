import { NavLink, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useMediaQuery } from "react-responsive";
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import Burger from '../Burger/Burger';
import './Navigation.css';

function Navigation({ loggedIn, isMainPage }) {

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  return (
    <div className="navigation">
      {(!loggedIn)
        ?
        <>
          <HashLink smooth to="/signup/#logo" className="navigation__link navigation__link_state_logged-in">Регистрация</HashLink>
          <HashLink to="/signin/#logo" className="navigation__link navigation__link_type_button">Войти</HashLink>
        </>
        :
        <>
          <div className='navigation__links-container'>
            {isDesktopOrLaptop && (
              <>
                <div className='navigation__link-wrapper'>
                  <NavLink to="/movies" className={({ isActive }) =>
                    `navigation__link 
                    ${isActive && 'navigation__link_active'}
                    ${isMainPage && 'navigation__link_place_main'}`}
                  >Фильмы</NavLink>
                  <NavLink to="/saved-movies" className={({ isActive }) =>
                    `navigation__link
                     ${isActive && 'navigation__link_active'}
                     ${isMainPage && 'navigation__link_place_main'}`}
                  >Сохраненные фильмы</NavLink>
                </div>
                <Link to="/profile" className="navigation__link navigation__link-profile">
                  {<ProfileIcon />}
                </Link>
              </>
            )}
            {isTabletOrMobile && <Burger isMainPage={isMainPage} />}
          </div>
        </>
      }
    </div>
  )
}

export default Navigation;