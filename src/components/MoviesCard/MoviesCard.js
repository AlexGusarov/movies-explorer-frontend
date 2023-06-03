import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import "../Tooltip/Tooltip.css";
import { MOVIE__IMAGES_URL } from "../../utils/constants";
import minToHours from "../../utils/minToHours";

function MoviesCard({ props, onSave, onDelete, savedMovies, isSavedMovies, isSaved }) {

  const location = useLocation().pathname.slice(1);

  function get_idByMovieId(movieId, savedMovies) {
    const id = savedMovies.filter((card) => card.movieId === movieId)[0]._id
    return id;
  }

  const handleClick = () => {
    if (location === "movies") {
      if (!isSaved) {
        onSave(props);
      } else {
        const _id = get_idByMovieId(props.id, savedMovies);
        const movieId = props.id;
        onDelete(_id, movieId);
      }
    }

    if (location === "saved-movies") {
      onDelete(props._id, props.movieId)
      //на разных страницах данные в props приходят в разном формате 
    }
  }


  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__wrapper">
          <p className="movies-card__name">{props.nameRU}</p>
          <span className="movies-card__duration">{minToHours(props.duration)}</span>
        </div>
        <button
          className={`${!isSavedMovies && "movies-card__button"}
            ${isSavedMovies && "movies-card__button-close"}       
            ${isSaved && "movies-card__button_saved"}`}
          aria-label={!isSavedMovies ? "Сохранить" : "Удалить"}

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