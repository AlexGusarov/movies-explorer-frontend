import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import NoMatch from '../NoMatch/NoMatch';
import Register from '../Register/Register';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Switch from '../Switch/Switch';

//только для верстки. Потом данные будут из api
import { films } from '../../utils/constants';

function App() {
  const [value, setValue] = useState(false);

  const location = useLocation().pathname.slice(1);

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

  return (
    <div className='root'>
      {isHeaderNeed() && <Header loggedIn={isLoggedIn} />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/movies" element={<MoviesCardList cards={films} />} />
        <Route path='/switch' element={
          <Switch isOn={value} handleToggle={() => setValue(!value)} />
        } />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      {isFooterNeed() && <Footer />}
    </div>
  )
};

export default App;