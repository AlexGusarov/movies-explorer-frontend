import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import './MoviesCardList.css';

function MoviesCardList({
  isLoading,
  isButtonMoreNeed,
  filteredMovies,
  moviesToRender,
  handleMoreClick,
  onSave,
  onDelete,
  savedMovies,
  isSavedMovies,

}) {

  return (
    <section className="movies-card-list">
      {isLoading && <Preloader />}
      <ul className="movies-card-list__list">
        {moviesToRender.map(item => {
          const isSaved = savedMovies.some(savedMovie => savedMovie.movieId === item.id);

          return (
            < MoviesCard
              props={item} {...item}
              key={isSavedMovies ? item._id : item.id}
              onSave={onSave}
              isSaved={isSaved}
              onDelete={onDelete}
              savedMovies={savedMovies}
              isSavedMovies={isSavedMovies}
            />)
        })}
      </ul>
      {(isButtonMoreNeed && filteredMovies > moviesToRender) && (
        <button className="movies-card-list__button-more"
          onClick={handleMoreClick}
        >Ещё
        </button>
      )}

    </section>
  )
};

export default MoviesCardList;