import SectionHeading from '../SectionHeading/SectionHeading';

function AboutProject() {
  return (
    <section className="about-project">
      <SectionHeading text="О проекте" />
      <ul className="about-project__list">
        <li className="about-project__list-item">
          <h3 className="about-project__list-title">
            Дипломный проект включал 5&nbsp;этапов
          </h3>
          <p className="about-project__list-text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.
          </p>
        </li>
        <li className="about-project__list-item">
          <h3 className="about-project__list-title">
            На выполнение диплома ушло 5&nbsp;недель
          </h3>
          <p className="about-project__list-text">
            У каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
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