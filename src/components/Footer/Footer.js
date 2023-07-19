import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <p className="footer__text">AG</p>
      </div>
      <div className="footer__container">
        <span className="footer__copyright">&copy; 2023</span>
        <ul className="footer__list">
          <li className="footer__item" id="contacts">
            radiogusarov@gmail.com
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