import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import MoviesCard from "../MoviesCard/MoviesCard";
import SearchForm from "../SearchForm/SearchForm";
import Switch from "../Switch/Switch";
import './MoviesCardList.css';

function MoviesCardList({ cards, isButtonMoreNeed }) {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
  const isMobile = useMediaQuery({ maxWidth: 649 })

  const [value, setValue] = useState(false);
  const [cardQuantity, setCardQuantity] = useState(12);
  const [shownCards, setShownCards] = useState(cards);


  function handleClickMore() {
    //количество карточек в ряду, которые добавляются кнопкой Ешё//
    let addition;

    if (isDesktopOrLaptop) {
      addition = 3;
    }

    if (isTabletOrMobile) {
      addition = 2;
    }

    if (isMobile) {
      addition = 1;
    }

    setCardQuantity(cardQuantity + addition);
    setTimeout(() => {
      window.scrollBy({
        top: 320,
        behavior: 'smooth',
      });
    }, 100)
  }

  //отрисовка карточек в количестве, которое зависит от размера экрана
  useEffect(() => {
    if (isDesktopOrLaptop) {
      setCardQuantity(12)
    }

    if (isTabletOrMobile) {
      setCardQuantity(8)
    }

    if (isMobile) {
      setCardQuantity(5)
    }

    setShownCards(cards.slice(0, cardQuantity))
  }, [cards, cardQuantity, isDesktopOrLaptop, isTabletOrMobile, isMobile]);


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
        {isButtonMoreNeed &&
          <button className="movies-card-list__button-more"
            onClick={handleClickMore}>Ещё</button>}
      </section>
    </>
  )
};

export default MoviesCardList;