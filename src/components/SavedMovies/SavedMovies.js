import { useEffect, useState, useCallback, useMemo } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import { errorMessages } from "../../utils/constants";
import Switch from "../Switch/Switch";
import SearchForm from "../SearchForm/SearchForm";
import MainApi from "../../utils/MainApi";

function SavedMovies({ onSave, onDelete, savedMovies, isSavedMovies }) {
  const [userMovies, setUserMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [filterString, setFilterString] = useState(null);
  const [isShort, setIsShort] = useState(false);
  const [isErrorSearch, setIsErrorSearch] = useState(false);
  const [searchErrorMessage, setSearchErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { searchEmpty } = errorMessages;

  const handleResize = useCallback(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await MainApi.getSavedMovies();
      setUserMovies(response);
    } catch (err) {
      setIsData(false);
    }
    finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();

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
    console.log('userMovies: ', userMovies)
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

  const moviesToRender = useMemo(() => {
    const countToRender = screenWidth < 768 ? 5 : screenWidth < 1280 ? 8 : 12;

    if (!filterString) {
      return userMovies.slice(0, countToRender)
    } else {
      return filteredMovies.slice(0, countToRender);
    }

  }, [filteredMovies, screenWidth]);

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
        moviesToRender={moviesToRender}
        onSave={onSave}
        onDelete={onDelete}
        savedMovies={userMovies}
        isSavedMovies={isSavedMovies}
      />
    </>
  )
};

export default SavedMovies;