import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title" id="portfolio">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/AlexGusarov/how-to-learn"
            target="_blank"
            rel="noreferrer">
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/AlexGusarov/russian-travel"
            target="_blank"
            rel="noreferrer">
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/AlexGusarov/react-mesto-api-full"
            rel="noreferrer"
            target="_blank">
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </div>
  )
};


export default Portfolio;