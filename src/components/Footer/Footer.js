function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      </div>
      <div className="footer__container">
        <span className="footer__copyright">&copy; 2023</span>
        <ul className="footer__list">
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://practicum.yandex.ru/"
              rel="noreferrer"
              target="_blank">
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://github.com/AlexGusarov/"
              rel="noreferrer"
              target="_blank" >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
};

export default Footer;