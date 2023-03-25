import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {cards.map((item, index) => (
          //для этапа вёрстки, потом для key будет movieId
          <MoviesCard props={item} {...item} key={`${index}`} />
        ))}
      </ul>
    </section>
  )
};

export default MoviesCardList;