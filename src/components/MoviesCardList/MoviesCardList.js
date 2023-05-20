import { useEffect, useState, useCallback, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import MoviesCard from "../MoviesCard/MoviesCard";
import SearchForm from "../SearchForm/SearchForm";
import Switch from "../Switch/Switch";
import moviesApi from "../../utils/MoviesApi";
import './MoviesCardList.css';

function MoviesCardList({ isButtonMoreNeed }) {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [filterString, setFilterString] = useState(null);
  const [isShort, setIsShort] = useState(false);
  const [page, setPage] = useState(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
      const response = await moviesApi.getAllMovies();


      setMovies(response);
      console.log(response)
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchMovies();

    // const savedSearch = localStorage.getItem("search");
    // const savedIsShort = localStorage.getItem("isShort");
    // const savedFilteredMovies = localStorage.getItem('movies');

    // if (savedSearch) {
    //   setSearch(savedSearch);
    //   setFilterString(savedSearch);
    // }

    // if (savedIsShort) {
    //   setIsShort(savedIsShort === "true");
    // }

    // if (savedFilteredMovies) {
    //   // setFilteredMovies(JSON.parse(savedFilteredMovies))
    // }
  }, []);


  const handleSubmit = useCallback(async (search) => {
    if (!search) {
      console.log('Введите название фильма')
      return
    }
    setFilterString(search)
  }, []);


  const filteredMovies = useMemo(() => {
    if (!filterString) {
      return [];
    }

    return movies.filter((movie) => {
      const nameRu = movie.nameRU.toLowerCase();
      const nameEn = movie.nameEN.toLowerCase();
      const str = filterString.toLowerCase();

      if (isShort && movie.duration > 40) {
        return false;
      }

      return nameRu.includes(str) || nameEn.includes(str)
    })

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
      <SearchForm onSearch={handleSubmit} />
      <div className="switch-box">
        <Switch isOn={isShort} handleToggle={() => setIsShort(!isShort)} />
        <span className="switch-box__label">Короткометражки</span>
      </div>
      <section className="movies-card-list">
        <ul className="movies-card-list__list">
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