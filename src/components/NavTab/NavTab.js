import './NavTab.css';

function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li className="navtab__item">
          <a className="navtab__link" href="#portfolio">Портфолио</a>
        </li>
        <li className="navtab__item">
          <a className="navtab__link" href="#student">Обо мне</a>
        </li>
        <li className="navtab__item">
          <a className="navtab__link" href="#project">О проекте</a>
        </li>
        <li className="navtab__item">
          <a className="navtab__link" href="#contacts">Контакты</a>
        </li>

      </ul>
    </nav>
  )
};

export default NavTab;