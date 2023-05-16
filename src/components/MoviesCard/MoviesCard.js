import { useState } from 'react';
import './MoviesCard.css';
import '../Tooltip/Tooltip.css';
import minToHours from '../../utils/minToHours';

function MoviesCard(props) {
  const [saved, setSaved] = useState(false);

  function handleClick() {
    setSaved(!saved);
    // + здесь будет вызвана функция сохранения фильмов//
  }

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__wrapper">
          <p className="movies-card__name">{props.nameRU}</p>
          <span className="movies-card__duration">{minToHours(props.duration)}</span>
        </div>
        <button
          className={`movies-card__button ${saved ? 'movies-card__button_saved' : ''}`}
          aria-label="Сохранить"
          onClick={handleClick}
        />
      </div>
      <a href={props.trailerLink}
        rel="noreferrer"
        target="_blank"
        className="movies-card__link"
        data-tooltip="Смотреть трейлер"
      >
        <img className="movies-card__image" src={`https://api.nomoreparties.co/${props.image.url}`} alt="Cмотреть трейлер фильма" />
      </a>
    </li>
  )
};

export default MoviesCard;