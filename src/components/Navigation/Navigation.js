import { Link } from 'react-router-dom';
import ProfileButton from '../ProfileButton/ProfileButton';
import Burger from '../Burger/Burger';

function Navigation({ loggedIn }) {
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
            <div className='navigation__link-wrapper'>
              <Link to="/movies" className="navigation__link navigation__link_logged-out">Фильмы</Link>
              <Link to="/saved-films" className="navigation__link navigation__link_logged-out">Сохраненные фильмы</Link>
            </div>
            {<Burger />}
            {/* <Link to="/sign-in" className="navigation__link">
              {<ProfileButton />}             
            </Link> */}
          </div>

        </>
      }
    </div>
  )
}

export default Navigation;