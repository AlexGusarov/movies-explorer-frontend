import SectionHeading from '../SectionHeading/SectionHeading';
import Portfolio from '../Portfolio/Portfolio';
import avatar from '../../images/Gus-circle_raw.png';
import { githubAddress } from '../../utils/constants';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <SectionHeading text="Обо мне" />
      <div className="about-me__container">
        <div className="about-me__text-container">
          <h3 className="about-me__title">Алексей</h3>
          <p className="about-me__subtitle">
            Фронтенд-разработчик, 36 лет
          </p>
          <p className="about-me__description">
            Родился в Калининграде, большую часть жизни прожил в Москве. В IT-сферу пришёл не сразу — окончил РГГУ по специальности «журналистика» и 15 лет работал в сфере медиа и коммуникаций. Мечта о собственных веб-проектах привела в «Яндекс Практикум». После окончания курса по направлению «веб-разработчик»  продолжаю совершенствоваться в React и Redux.
          </p>
        </div>
        <a className="about-me__link"
          href={githubAddress}
          rel="noreferrer"
          target="_blank"
        >Github</a>
        <img className="about-me__photo" src={avatar} alt="Фото студента" />
      </div>
      <Portfolio />
    </section>
  )
};

export default AboutMe;