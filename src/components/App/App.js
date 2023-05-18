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
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { register, authorize, checkToken } from "../../utils/auth";
import { errorMessages } from '../../utils/constants';

import './App.css';

function App() {
  const location = useLocation().pathname.slice(1);
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState("");
  const [infoTooltipMessage, setInfoTooltipMessage] = useState("");
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
        setIsInfoTooltipOpen(true);
        setInfoTooltipStatus('ok');
        setRegisterStatus(true);

        navigate('/signin');
      }
    } catch (err) {
      setIsInfoTooltipOpen(true);
      setInfoTooltipStatus('failed');
      setRegisterStatus(false);

      const { codeConflict, conflict, registerMistake } = errorMessages;
      const message = err.includes(codeConflict) ? conflict : registerMistake;
      setInfoTooltipMessage(message);
    }
    finally {
      setLoading(false);
    }
  }, [])

  const closeInfoTooltip = () => setIsInfoTooltipOpen(false);

  //переключатель хэдера. Только для верстки, затем loggedIn будет из авторизации
  const isLoggedIn = (location === '') ? false : true;

  //монтируем фильмы
  useEffect(() => {
    moviesApi.getAllMovies()
      .then((res) => setMovies(res))
      .catch((err) => {
        console.log(`Произошла ошибка с получением данных карточек - ${err}`)
      })
  }, []);

  if (loading) {
    return (
      <Preloader />
    )
  }

  return (
    <div className='root'>
      {isHeaderNeed() && <Header loggedIn={isLoggedIn} />}
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register onRegister={registerUser} />} />
          <Route path="/signin" element={<Login />} />
          {/* // для этапа верстки, затем cards и savedCards будут приходить из запросов// */}
          <Route path="/movies" element={<MoviesCardList cards={movies} isButtonMoreNeed={true} />} />
          {/* <Route path="/saved-movies" element={<SavedMovies savedCards={savedCards} />} /> */}
          <Route path='/profile' element={<Profile />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
      {isFooterNeed() && <Footer />}
      <InfoTooltip
        onClose={closeInfoTooltip}
        isOpen={isInfoTooltipOpen}
        status={infoTooltipStatus}
        errorMessage={infoTooltipMessage}
      />
    </div>
  )
};

export default App;