import { useState } from 'react';
import './MoviesCard.css';
import '../Tooltip/Tooltip.css';
import { MOVIE__IMAGES_URL } from '../../utils/constants';
import minToHours from '../../utils/minToHours';

function MoviesCard({ props, onSave, onDelete, savedMovies, isSavedMovies }) {
  const [savedCard, setSavedCard] = useState(false);

  function getIdSavedMovie(movieId, savedMovies) {
    const currentMovie = savedMovies.filter((movie) => movie.movieId === movieId);

    return currentMovie[0]._id;
  }

  const deleteMovie = () => {
    const id = getIdSavedMovie(props.id, savedMovies)
    onDelete(id, props.id)
  }

  function handleClick() {
    setSavedCard(!savedCard);

    if (!savedCard) {
      onSave(props)
    } else deleteMovie()
  }

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__wrapper">
          <p className="movies-card__name">{props.nameRU}</p>
          <span className="movies-card__duration">{minToHours(props.duration)}</span>
        </div>
        <button
          className={`movies-card__button ${savedCard ? 'movies-card__button_saved' : ''}`}
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
        <img
          className="movies-card__image"
          src={!isSavedMovies ? `${MOVIE__IMAGES_URL}/${props.image.url}` : props.image}
          alt="Cмотреть трейлер фильма" />
      </a>
    </li>
  )
};

export default MoviesCard;