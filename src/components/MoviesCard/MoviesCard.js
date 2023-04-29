import { useState } from 'react';
import './MoviesCard.css';
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
        <button className={`movies-card__button ${saved ? 'movies-card__button_saved' : ''}`} aria-label="Save" onClick={handleClick} />
      </div>
      <a href={props.trailerLink} className="movies-card__link">
        <img className="movies-card__image" src={props.image} alt="Cмотреть трейлер фильма" />
      </a>
    </li>
  )
};

export default MoviesCard;