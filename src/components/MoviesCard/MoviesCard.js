import './MoviesCard.css';

function MoviesCard(props) {
  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__wrapper">
          <p className="movies-card__name">{props.name}</p>
          <span className="movies-card__duration">{props.duration}</span>
        </div>
        <button className="movies-card__button" aria-label="Save" />
      </div>
      <a href={props.trailerLink} className="movies-card__link">
        <img className="movies-card__image" src={require(`../../images/2.jpg`)} alt="Cмотреть трейлер фильма" />
      </a>
    </li>
  )
};

export default MoviesCard;