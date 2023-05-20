import './SearchForm.css';
import { useForm } from '../../hooks/useForm';

function SearchForm({ onSearch }) {
  const { values, handleChange, setValues } = useForm();

  const makeFormClear = () => {
    setValues({});
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const searchRequest = values.search;

    onSearch(searchRequest);
    console.log('searchRequest: ', searchRequest);

    makeFormClear();
    evt.target.reset();
  }


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
      </form>
    </section>
  )
}

export default SearchForm;