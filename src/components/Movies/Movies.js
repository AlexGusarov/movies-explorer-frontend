import { useEffect, useState, useCallback, useMemo } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import Switch from "../Switch/Switch";
import SearchForm from "../SearchForm/SearchForm";
import MainApi from "../../utils/MainApi";
import { MOVIE__IMAGES_URL, errorMessages } from '../../utils/constants';
import ErrorTooltip from "../ErrorTooltip/ErrorTooltip";


function Movies({ isSavedMovies }) {

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [filterString, setFilterString] = useState(null);
  const [isShort, setIsShort] = useState(false);
  const [isErrorSearch, setIsErrorSearch] = useState(false);
  const [isErrorCard, setIsErrorCard] = useState(false);
  const [searchErrorMessage, setSearchErrorMessage] = useState('');
  const [cardErrorMessage, setCardErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(true);
  const [page, setPage] = useState(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { searchEmpty, notFound, noData } = errorMessages;
  const [isInitMount, setIsInitMount] = useState(true);


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
      setCardErrorMessage(noData);
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
    const countToRender = screenWidth < 650 ? 5 : screenWidth < 1100 ? 8 : 12;

    return filteredMovies.slice(0, countToRender * page);
  }, [filteredMovies, page, screenWidth]);


  function handleSaveMovie(data) {
    MainApi.saveMovie({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: MOVIE__IMAGES_URL + data.image.url,
      trailerLink: data.trailerLink,
      thumbnail: MOVIE__IMAGES_URL + data.image.formats.thumbnail.url,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
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

    MainApi.deleteMovie(id)
      .then(() => {
        setSavedMovies(prev => {
          return prev.filter(movie => movie.movieId !== movieId);
        })
      })
      .catch(err => {
        console.log(err);
        console.log(movieId)
      });
  }

  useEffect(() => {
    if (isInitMount) {
      setIsInitMount(false)
    } else {
      if (!isLoading && filteredMovies.length === 0) {
        setCardErrorMessage(notFound)
        setIsErrorCard(true)
      } else { setIsErrorCard(false) }
    }
  }, [filteredMovies])


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
      {(isErrorCard || !isData) && <ErrorTooltip message={cardErrorMessage} />}
      <MoviesCardList
        isLoading={isLoading}
        isData={isData}
        isErrorCard={isErrorCard}
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
        filterString={filterString}
      />
    </>
  )
};

export default Movies;