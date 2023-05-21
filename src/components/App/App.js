import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import moviesApi from '../../utils/MoviesApi';
import Main from '../Main/Main';
import NoMatch from '../NoMatch/NoMatch';
import Register from '../Register/Register';
import Login from '../Login/Login';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SavedMovies from '../SavedMovies/SavedMovies';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Preloader from '../Preloader/Preloader';
import { register, authorize, checkToken } from "../../utils/auth";
import { errorMessages } from '../../utils/constants';
import SearchForm from '../SearchForm/SearchForm';

import './App.css';

function App() {
  const location = useLocation().pathname.slice(1);
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorTooltipMessage, setErrorTooltipMessage] = useState("");
  const [registerStatus, setRegisterStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState({});



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
      const data = await register(name, email, password);
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
      const data = await authorize(login, password);

      if (!data) {
        setIsError(true);
        setErrorTooltipMessage(errorMessages.badRequest);
        throw new Error('Неверные логин или пароль');
      }
      if (data.token) {
        setLoggedIn(true);
        localStorage.setItem('token', data.token);
        console.log(data.token);
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

  //переключатель хэдера. Только для верстки, затем loggedIn будет из авторизации
  const isLoggedIn = (location === '') ? false : true;

  // if (loading) {
  //   return (
  //     <Preloader />
  //   )
  // }

  return (
    <div className='root'>
      {isHeaderNeed() && <Header loggedIn={isLoggedIn} />}
      <main>
        <Routes>
          <Route path="/search" element={<SearchForm />} />
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
          {/* // для этапа верстки, затем cards и savedCards будут приходить из запросов// */}
          <Route path="/movies" element={<MoviesCardList isButtonMoreNeed={true} />} />
          {/* <Route path="/saved-movies" element={<SavedMovies savedCards={savedCards} />} /> */}
          <Route path='/profile' element={<Profile />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
      {isFooterNeed() && <Footer />}
    </div>
  )
};

export default App;