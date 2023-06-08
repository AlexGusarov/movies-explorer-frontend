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
import MainApi from '../../utils/MainApi';
import { errorMessages } from '../../utils/constants';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorTooltipMessage, setErrorTooltipMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isAppStart, setIsAppStart] = useState(false);

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
        enterAccount(email, password);
      }
    } catch (err) {
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
      if (!data || data.message === '') {
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
      throw new Error('Неверные логин или пароль');
    }
    finally {
      setLoading(false)
      setTimeout(() => {
        setIsError(false);
      }, 2000)
    }
  }, [])


  const handleProfileSubmit = useCallback(({ name, email }) => {
    MainApi.updateUser({ name, email });

    setCurrentUser({ name, email });
  }, [])


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
          setCurrentUser(user);
          setIsAppStart(true);
        }
      }
    }
    catch (error) {
      setIsAppStart(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [loggedIn]);


  const handleLogout = useCallback(() => {
    setLoggedIn(false);
    localStorage.removeItem('token');
  }, [])


  useEffect(() => {
    tokenCheck();
  }, [tokenCheck])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isAppStart ?
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
                    savedMovies={savedMovies}
                    isSavedMovies={false} />
                </ProtectedRoute>
              } />
              <Route path="/saved-movies" element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <SavedMovies
                    savedMovies={savedMovies}
                    isSavedMovies={true} />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile
                    onProfile={handleProfileSubmit}
                    onLogout={handleLogout}
                  />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </main>
          {isFooterNeed() && <Footer />}
        </div>
        : null}
    </CurrentUserContext.Provider>
  )
};

export default App;