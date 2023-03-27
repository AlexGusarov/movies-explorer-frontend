import { Link } from 'react-router-dom';
import Profile from '../Profile/Profile';

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
            <Link to="/sign-in" className="navigation__link">
              {<Profile />}
            </Link>
          </div>

        </>
      }
    </div>
  )
}

export default Navigation;