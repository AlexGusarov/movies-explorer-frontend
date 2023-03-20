import { useNavigate } from 'react-router-dom';

function NoMatch() {
  const navigate = useNavigate();
  return (
    <main className="no-match">
      <div className="no-match__container">
        <h1 className="no-match__code">404</h1>
        <p className="no-match__text">Страница не найдена</p>
      </div>
      <button onClick={() => navigate(-1)} className="no-match__button" >Назад</button>
    </main>
  )
}

export default NoMatch;