import logo from '../../images/logo.svg';
import './Logo.css';

function Logo() {
  return (
    <img src={logo} alt="Логотип" className="logo" />
  )
};

export default Logo;