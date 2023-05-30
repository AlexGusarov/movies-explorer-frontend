import { useEffect, useState, useCallback, useMemo } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import { errorMessages } from "../../utils/constants";
import Switch from "../Switch/Switch";
import SearchForm from "../SearchForm/SearchForm";
import MainApi from "../../utils/MainApi";
import { MOVIE__IMAGES_URL } from '../../utils/constants';


function Movies({ isSavedMovies }) {

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [filterString, setFilterString] = useState(null);
  const [isShort, setIsShort] = useState(false);
  const [isErrorSearch, setIsErrorSearch] = useState(false);
  const [searchErrorMessage, setSearchErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(true);
  const [page, setPage] = useState(1);
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


  const handleMoreClick = useCallback(() => {
    setPage((prev) => prev + 1);
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


  const getSavedMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      const apiSavedMovies = await MainApi.getSavedMovies();
      setSavedMovies(apiSavedMovies);
    } catch (err) {
      setIsData(false);
    }
    finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
    getSavedMovies()

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


  function handleSaveMovie(data) {
    MainApi.saveMovie({
      country: data.country ? data.country : 'No country',
      director: data.director ? data.director : 'No director',
      duration: data.duration ? data.duration : 0,
      year: data.year ? data.year : '0000',
      description: data.description ? data.description.slice(0, 1000) : 'No description',
      image: data.image.url ? MOVIE__IMAGES_URL + data.image.url : 'No image link',
      trailerLink: data.trailerLink ? data.trailerLink : 'No trailer link',
      thumbnail: data.image.formats.thumbnail.url ? MOVIE__IMAGES_URL + data.image.formats.thumbnail.url : 'No info image',
      movieId: data.id,
      nameRU: data.nameRU ? data.nameRU : 'No nameRU',
      nameEN: data.nameEN ? data.nameEN : 'No nameEN',
    })
      .then((savedMovie) => {
        setSavedMovies(prev => {
          return [...prev, savedMovie];
        });
      })
      .catch(err => {
        console.log(err.message)
      });
  }


  function handleDeleteMovie(id, movieId) {
    console.log('id: ', id, 'movieId: ', movieId)
    console.log('prev savedMovies', savedMovies)
    MainApi.deleteMovie(id)
      .then(() => {
        setSavedMovies(prev => {
          return prev.filter(movie => movie.movieId !== movieId);
        })
        console.log('post savedMovies', savedMovies)
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
        isButtonMoreNeed={true}
        searchErrorMessage={searchErrorMessage}
        filteredMovies={filteredMovies}
        handleSubmitSearch={handleSubmitSearch}
        moviesToRender={moviesToRender}
        handleMoreClick={handleMoreClick}
        onSave={handleSaveMovie}
        onDelete={handleDeleteMovie}
        savedMovies={savedMovies}
        isSavedMovies={isSavedMovies}
      />
    </>
  )
};

export default Movies;