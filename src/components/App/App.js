import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import NoMatch from '../NoMatch/NoMatch';
import Register from '../Register/Register';
import MoviesCard from '../MoviesCard/MoviesCard';

function App() {
  return (
    <div className='root'>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/card" element={<MoviesCard name="Асса" duration="1ч 17м" image="../../images/1.jpg" />} />
      </Routes>
    </div>
  )
};

export default App;