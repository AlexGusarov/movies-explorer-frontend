import './SearchForm.css';
import { useForm } from '../../hooks/useForm';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


function SearchForm({ onSearch, searchErrorMessage, isError }) {
  const { values, handleChange, setValues } = useForm();
  const location = useLocation().pathname.slice(1);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const searchRequest = values.search;
    onSearch(searchRequest);
  }

  useEffect(() => {
    const moviesSearch = localStorage.getItem('search');

    if (location === 'movies') {
      setValues({ search: moviesSearch });
    }
  }, [])

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          id="search"
          name="search"
          placeholder="Фильм"
          onChange={handleChange}
          value={values.search || ''}
        />
        <button
          className="search__button"
          type="submit"
          aria-label="Поиск" />
        {isError && (<span className="search__error">{searchErrorMessage}</span>)}
      </form>
    </section>
  )
}

export default SearchForm;