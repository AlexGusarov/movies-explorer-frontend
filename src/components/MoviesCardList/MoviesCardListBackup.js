import { useEffect, useState, useCallback, useMemo } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import SearchForm from "../SearchForm/SearchForm";
import Switch from "../Switch/Switch";
import moviesApi from "../../utils/MoviesApi";
import { errorMessages } from "../../utils/constants";
import Preloader from "../Preloader/Preloader";
import './MoviesCardList.css';

function MoviesCardList() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [filterString, setFilterString] = useState(null);
  const [isShort, setIsShort] = useState(false);
  const [page, setPage] = useState(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isErrorSearch, setIsErrorSearch] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(true);

  const { notFound, noData, searchEmpty } = errorMessages;


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
      const response = await moviesApi.getAllMovies();
      setMovies(response);
    } catch (err) {
      setIsData(false);
    }
    finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();

    const savedSearch = localStorage.getItem("search");
    const savedIsShort = localStorage.getItem("isShort");

    if (savedSearch) {
      setSearch(savedSearch);
      setFilterString(savedSearch);
    }

    if (savedIsShort) {
      setIsShort(savedIsShort === "true");
    }

  }, []);


  const handleSubmit = useCallback(async (search) => {
    if (!search) {
      setErrMessage(searchEmpty);
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
    const filtered = movies.filter((movie) => {
      const nameRu = movie.nameRU.toLowerCase();
      const nameEn = movie.nameEN.toLowerCase();
      const str = filterString.toLowerCase();

      if (isShort && movie.duration > 40) {
        return false;
      }
      return nameRu.includes(str) || nameEn.includes(str)
    })
    localStorage.setItem("search", filterString);
    localStorage.setItem("isShort", String(isShort));

    return filtered;
  }, [filterString, movies, isShort]);


  const moviesToRender = useMemo(() => {
    const countToRender = screenWidth < 768 ? 5 : screenWidth < 1280 ? 8 : 12;

    return filteredMovies.slice(0, countToRender * page);
  }, [filteredMovies, page, screenWidth]);


  const handleMoreClick = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);


  return (
    <>
      <SearchForm
        onSearch={handleSubmit}
        searchErrorMessage={errMessage}
        isError={isErrorSearch}
      />
      <div className="switch-box">
        <Switch isOn={isShort} handleToggle={() => setIsShort(!isShort)} />
        <span className="switch-box__label">Короткометражки</span>
      </div>
      <section className="movies-card-list">
        {isLoading && <Preloader />}
        <ul className="movies-card-list__list">
          {(!isLoading && filteredMovies.length === 0) &&
            (<span className="movies-card-list__error">{isData ? notFound : noData}</span>)
          }
          {moviesToRender.map((item, index) => (
            <MoviesCard props={item} {...item} key={`${index}`} />
          ))}
        </ul>
        {filteredMovies > moviesToRender && (
          <button className="movies-card-list__button-more"
            onClick={handleMoreClick}
          >Ещё
          </button>
        )}
      </section>
    </>
  )
};

export default MoviesCardList;