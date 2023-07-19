import SectionHeading from '../SectionHeading/SectionHeading';
import './Techs.css';

function Techs() {
  return (
    <section className="techs" id="techs">
      <SectionHeading text="Технологии" />
      <div className="techs__text-container">
        <h3 className="techs__title">Мой стек</h3>
        {/* <p className="techs__subtitle">
        </p> */}
      </div>
      <ul className="techs__list">
        <li className="techs__list-item">HTML</li>
        <li className="techs__list-item">CSS</li>
        <li className="techs__list-item">JS</li>
        <li className="techs__list-item">React</li>
        <li className="techs__list-item">Redux</li>
        <li className="techs__list-item">Git</li>
        <li className="techs__list-item">Express.js</li>
        <li className="techs__list-item">mongoDB</li>
      </ul>
    </section>
  )
};

export default Techs;