import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import NoMatch from '../NoMatch/NoMatch';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Preloader from '../Preloader/Preloader';
import MainApi from '../../utils/MainApi';
import { errorMessages } from '../../utils/constants';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { MOVIE__IMAGES_URL } from '../../utils/constants';


import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorTooltipMessage, setErrorTooltipMessage] = useState("");
  const [registerStatus, setRegisterStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);


  const location = useLocation().pathname.slice(1);
  const navigate = useNavigate();


  function isHeaderNeed() {
    const pathsForHeader = ['', 'movies', 'saved-movies', 'profile'];
    return pathsForHeader.includes(location);
  }

  function isFooterNeed() {
    const pathsForFooter = ['', 'movies', 'saved-movies'];
    return pathsForFooter.includes(location);
  }

  const registerUser = useCallback(async (name, email, password) => {
    try {
      setLoading(true);
      const data = await MainApi.register(name, email, password);
      if (data) {
        setRegisterStatus(true);

        navigate('/signin');
      }
    } catch (err) {
      setRegisterStatus(false);

      const { codeConflict, conflict, registerMistake } = errorMessages;
      const message = err.includes(codeConflict) ? conflict : registerMistake;
      console.log(message);
      setErrorTooltipMessage(message);
      setIsError(true);
    }
    finally {
      setLoading(false);
    }
  }, [])


  const enterAccount = useCallback(async (login, password) => {
    try {
      setLoading(true);
      const data = await MainApi.authorize(login, password);

      if (!data) {
        setIsError(true);
        setErrorTooltipMessage(errorMessages.badRequest);
        throw new Error('Неверные логин или пароль');
      }
      if (data.token) {
        setLoggedIn(true);
        localStorage.setItem('token', data.token);
        navigate('/movies');
      }
    } catch (err) {
      console.log(err)
      setIsError(true);
      setErrorTooltipMessage(errorMessages.badRequest);
    }
    finally {
      setLoading(false)
    }
  }, []);



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

  // //переключатель хэдера. Только для верстки, затем loggedIn будет из авторизации
  // const isLoggedIn = (location === '') ? false : true;

  // if (loading) {
  //   return (
  //     <Preloader />
  //   )
  // }


  const tokenCheck = useCallback(async () => {

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('no token');
      }
      if (token) {
        const user = await MainApi.getUser(token);
        if (!user) {
          throw new Error('no user');
        }
        if (user) {
          setLoggedIn(true);
          navigate('/movies')
        }
      }
    }
    catch (error) {
      console.log('tokenCheck', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {

    tokenCheck();

  }, [tokenCheck])



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        {isHeaderNeed() && <Header loggedIn={loggedIn} location={location} />}
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={
              <Register
                onRegister={registerUser}
                isError={isError}
                message={errorTooltipMessage}
                isLoading={loading}
              />} />
            <Route path="/signin" element={
              <Login
                onLogin={enterAccount}
                isError={isError}
                message={errorTooltipMessage}
                isLoading={loading}
              />} />
            <Route path="/movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                  onSave={handleSaveMovie}
                  onDelete={handleDeleteMovie}
                  savedMovies={savedMovies}
                  isSavedMovies={false} />
              </ProtectedRoute>
            } />
            <Route path="/saved-movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                  onSave={handleSaveMovie}
                  onDelete={handleDeleteMovie}
                  savedMovies={savedMovies}
                  isSavedMovies={true} />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
        {isFooterNeed() && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  )
};

export default App;