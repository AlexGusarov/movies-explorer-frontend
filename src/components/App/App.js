import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import NoMatch from '../NoMatch/NoMatch';
import Register from '../Register/Register';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { films } from '../../utils/constants';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {

  const location = useLocation();

  function isHeaderNeed() {
    const pathsForHeader = ['', 'movies', 'saved-movies', 'profile'];
    return pathsForHeader.includes(location.pathname.slice(1));
  }

  function isFooterNeed() {
    const pathsForFooter = ['', 'movies', 'saved-movies'];
    return pathsForFooter.includes(location.pathname.slice(1));
  }

  return (
    <div className='root'>
      {isHeaderNeed() && <Header loggedIn={true} />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/card" element={<MoviesCard nameRU="Асса" duration="1ч 17м" image="https://images.unsplash.com/photo-1670272501077-c72d2d42f362?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60" />} />
        <Route path="/movies" element={<MoviesCardList cards={films} />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      {isFooterNeed() && <Footer />}
    </div>
  )
};

export default App;