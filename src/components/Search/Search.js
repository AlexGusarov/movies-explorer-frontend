import './Search.css';

function Search() {
  return (
    <section className="search">
      <form className="search__form">
        <input className="search__input" type="text" id="search" placeholder="Фильм" />
        <button className="search__button" type="submit" aria-label="Поиск" />
      </form>
    </section>
  )
}

export default Search;