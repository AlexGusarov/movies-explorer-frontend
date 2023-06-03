import { useEffect, useState, useCallback, useMemo } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { errorMessages } from "../../utils/constants";
import Switch from "../Switch/Switch";
import SearchForm from "../SearchForm/SearchForm";
import MainApi from "../../utils/MainApi";

function SavedMovies({ isSavedMovies }) {
  const [userMovies, setUserMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [filterString, setFilterString] = useState(null);
  const [isShort, setIsShort] = useState(false);
  const [isErrorSearch, setIsErrorSearch] = useState(false);
  const [searchErrorMessage, setSearchErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(true);
  const { searchEmpty } = errorMessages;


  const getSavedMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      const apiSavedMovies = await MainApi.getSavedMovies();
      setUserMovies(apiSavedMovies);
    } catch (err) {
      setIsData(false);
    }
    finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    getSavedMovies();

    const savedSearchUserMovies = localStorage.getItem("search-user");
    const savedIsShortUserMovies = localStorage.getItem("isShort-user");

    if (savedSearchUserMovies) {
      setSearch(savedSearchUserMovies);
      setFilterString(savedSearchUserMovies);
    }

    if (savedIsShortUserMovies) {
      setIsShort(savedIsShortUserMovies === "true");
    }
  }, []);


  const handleSubmitSearch = useCallback(async (search) => {
    if (!search) {
      setSearchErrorMessage(searchEmpty);
      setIsErrorSearch(true);
      return
    }
    setIsErrorSearch(false);
    setFilterString(search);
  }, []);


  const filteredMovies = useMemo(() => {
    if (!filterString) {
      return [];
    }
    const filtered = userMovies.filter((movie) => {
      const nameRu = movie.nameRU.toLowerCase();
      const nameEn = movie.nameEN.toLowerCase();
      const str = filterString.toLowerCase();

      if (isShort && movie.duration > 40) {
        return false;
      }
      return nameRu.includes(str) || nameEn.includes(str)
    })
    localStorage.setItem("search-user", filterString);
    localStorage.setItem("isShort-user", String(isShort));

    return filtered;
  }, [filterString, userMovies, isShort]);


  function handleDeleteMovie(id, movieId) {
    MainApi.deleteMovie(id)
      .then(() => {
        setUserMovies(prev => {
          return prev.filter(movie => movie.movieId !== movieId);
        })
      })
      .catch(err => {
        console.log(err);
        console.log(movieId)
      });
  }


  return (
    <>
      <SearchForm
        onSearch={handleSubmitSearch}
        searchErrorMessage={searchErrorMessage}
        isError={isErrorSearch}
      />
      <div className="switch-box">
        <Switch isOn={isShort} handleToggle={() => setIsShort(!isShort)} />
        <span className="switch-box__label">Короткометражки</span>
      </div>
      <MoviesCardList
        isLoading={isLoading}
        isData={isData}
        isShort={isShort}
        setIsShot={setIsShort}
        isErrorSearch={isErrorSearch}
        isButtonMoreNeed={false}
        searchErrorMessage={searchErrorMessage}
        filteredMovies={filteredMovies}
        handleSubmitSearch={handleSubmitSearch}
        moviesToRender={filteredMovies}
        onDelete={handleDeleteMovie}
        savedMovies={userMovies}
        isSavedMovies={isSavedMovies}
      />
    </>
  )
};

export default SavedMovies;