import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import NoMatch from '../NoMatch/NoMatch';
import Register from '../Register/Register';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { films } from '../../utils/constants';


function App() {


  return (
    <div className='root'>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/card" element={<MoviesCard nameRU="Асса" duration="1ч 17м" image="https://images.unsplash.com/photo-1670272501077-c72d2d42f362?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60" />} />
        <Route path="/card-list" element={<MoviesCardList cards={films} />} />
      </Routes>
    </div>
  )
};

export default App;