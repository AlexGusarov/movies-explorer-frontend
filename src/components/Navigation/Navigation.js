import { Link } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import Burger from '../Burger/Burger';
import './Navigation.css';

function Navigation({ loggedIn }) {

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  return (
    <div className="navigation">
      {(!loggedIn)
        ?
        <>
          <Link to="/sign-up" className="navigation__link navigation__link_logged-in">Регистрация</Link>
          <Link to="/sign-in" className="navigation__link navigation__link_button">Войти</Link>
        </>
        :
        <>
          <div className='navigation__links-container'>
            {isDesktopOrLaptop && (
              <>
                <div className='navigation__link-wrapper'>
                  <Link to="/movies" className="navigation__link navigation__link_logged-out">Фильмы</Link>
                  <Link to="/saved-films" className="navigation__link navigation__link_logged-out">Сохраненные фильмы</Link>
                </div>
                <Link to="/sign-in" className="navigation__link navigation__link-profile">
                  {<ProfileIcon />}
                </Link>
              </>
            )}
            {isTabletOrMobile && <Burger />}
          </div>
        </>
      }
    </div>
  )
}

export default Navigation;