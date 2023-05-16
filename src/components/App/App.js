import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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

import './App.css';

//только для верстки. Потом данные будут из api
import { films, savedCards } from '../../utils/constants';

function App() {
  const location = useLocation().pathname.slice(1);

  const [movies, setMovies] = useState([]);

  function isHeaderNeed() {
    const pathsForHeader = ['', 'movies', 'saved-movies', 'profile'];
    return pathsForHeader.includes(location);
  }

  function isFooterNeed() {
    const pathsForFooter = ['', 'movies', 'saved-movies'];
    return pathsForFooter.includes(location);
  }

  //переключатель хэдера. Только для верстки, затем loggedIn будет из авторизации
  const isLoggedIn = (location === '') ? false : true;

  //монтируем фильмы
  useEffect(() => {
    moviesApi.getAllMovies()
      .then((res) => setMovies(res))
      .catch((err) => {
        console.log(`Произошла ошибка с получением данных карточек - ${err}`)
      })
  }
    , []);

  return (
    <div className='root'>
      {isHeaderNeed() && <Header loggedIn={isLoggedIn} />}
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          {/* // для этапа верстки, затем cards и savedCards будут приходить из запросов// */}
          <Route path="/movies" element={<MoviesCardList cards={movies} isButtonMoreNeed={true} />} />
          <Route path="/saved-movies" element={<SavedMovies savedCards={savedCards} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="*" element={<NoMatch />} />

        </Routes>
      </main>
      {isFooterNeed() && <Footer />}
    </div>
  )
};

export default App;