import MoviesCard from "../MoviesCard/MoviesCard";
import Search from "../Search/Search";

function MoviesCardList({ cards }) {
  return (
    <>
      <Search />
      <section className="movies-card-list">
        <ul className="movies-card-list__list">
          {cards.map((item, index) => (
            //для этапа вёрстки, потом для key будет movieId
            <MoviesCard props={item} {...item} key={`${index}`} />
          ))}
        </ul>
      </section>
    </>
  )
};

export default MoviesCardList;