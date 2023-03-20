import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import NoMatch from '../NoMatch/NoMatch';

function App() {
  return (
    <div className='root'>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  )
};

export default App;