import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import MoviesCard from "../MoviesCard/MoviesCard";
import SearchForm from "../SearchForm/SearchForm";
import Switch from "../Switch/Switch";
import './MoviesCardList.css';

function MoviesCardList({ cards }) {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  const [value, setValue] = useState(false);
  const [cardQuantity, setCardQuantity] = useState(12);
  const [shownCards, setShownCards] = useState(cards);

  function handleClickMore() {
    setCardQuantity(cardQuantity + 3);
    setTimeout(() => {
      window.scrollBy({
        top: 320,
        behavior: 'smooth',
      });
    }, 100)
  }

  useEffect(() => {
    if (isDesktopOrLaptop) {
      setCardQuantity(12)
    }

    if (isTabletOrMobile) {
      setCardQuantity(8)
    }
    setShownCards(cards.slice(0, cardQuantity))
  }, [cardQuantity, isDesktopOrLaptop, isTabletOrMobile]);

  return (
    <>
      <SearchForm />
      <div className="switch-box">
        <Switch isOn={value} handleToggle={() => setValue(!value)} />
        <span className="switch-box__label">Короткометражки</span>
      </div>
      <section className="movies-card-list">
        <ul className="movies-card-list__list">
          {shownCards.map((item, index) => (
            //для этапа вёрстки, потом для key будет movieId
            <MoviesCard props={item} {...item} key={`${index}`} />
          ))}
        </ul>
        <button className="movies-card-list__button-more" onClick={handleClickMore}>Ещё</button>
      </section>
    </>
  )
};

export default MoviesCardList;