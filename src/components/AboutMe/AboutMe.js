import SectionHeading from '../SectionHeading/SectionHeading';
import Portfolio from '../Portfolio/Portfolio';
import avatar from '../../images/avatar.jpg';
import { githubAddress } from '../../utils/constants';

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <SectionHeading text="Студент" />
      <div className="about-me__container">
        <div className="about-me__text-container">
          <h3 className="about-me__title">Виталий</h3>
          <p className="about-me__subtitle">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
        </div>
        <a className="about-me__link" href={githubAddress}>Github</a>
        <img className="about-me__photo" src={avatar} alt="Фото студента" />
      </div>
      <Portfolio />
    </section>
  )
};

export default AboutMe;