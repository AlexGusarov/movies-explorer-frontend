import { Link } from 'react-router-dom';
import SectionHeading from '../SectionHeading/SectionHeading';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="project">
      <SectionHeading text="О проекте" />
      <ul className="about-project__list">
        <li className="about-project__list-item">
          <h3 className="about-project__list-title">
            Сервис просмотра базы фильмов
          </h3>
          <p className="about-project__list-text">
            Это пример моей работы. Макет — «Яндекс Практикум». Чтобы получить доступ, надо <Link to="/signup"> зарегистрироваться</Link>.
          </p>
        </li>
        <li className="about-project__list-item">
          <h3 className="about-project__list-title">
            Проект включал 5&nbsp;этапов
          </h3>
          <p className="about-project__list-text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.
          </p>
        </li>
      </ul>
      <div className="about-project__timeline">
        <div className="about-project__weeks">
          <p className="about-project__week">1 неделя</p>
          <p className="about-project__week">4 недели</p>
        </div>
        <div className="about-project__stages">
          <p className="about-project__stage">Back-end</p>
          <p className="about-project__stage">Front-end</p>
        </div>
      </div>
    </section >
  )
}

export default AboutProject;