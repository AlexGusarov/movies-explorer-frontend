import MoviesCard from "../MoviesCard/MoviesCard";
import { errorMessages } from "../../utils/constants";
import Preloader from "../Preloader/Preloader";
import './MoviesCardList.css';

function MoviesCardList({
  isLoading,
  isData,
  isButtonMoreNeed,
  filteredMovies,
  moviesToRender,
  handleMoreClick,
  onSave,
  onDelete,
  savedMovies,
  isSavedMovies }) {

  const { notFound, noData } = errorMessages;



  return (
    <section className="movies-card-list">
      {isLoading && <Preloader />}
      <ul className="movies-card-list__list">
        {(!isLoading && filteredMovies.length === 0 && !isSavedMovies) &&
          (<span className="movies-card-list__error">{isData ? notFound : noData}</span>)
        }
        {moviesToRender.map((item) => (
          < MoviesCard
            props={item} {...item}
            key={isSavedMovies ? item._id : item.id}
            onSave={onSave}
            onDelete={onDelete}
            savedMovies={savedMovies}
            isSavedMovies={isSavedMovies}
          />
        )
        )}
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