import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ savedCards }) {

  return (
    <>
      <MoviesCardList cards={savedCards} isButtonMoreNeed={false} />
    </>
  )
};

export default SavedMovies;