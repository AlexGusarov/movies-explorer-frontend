import logo from '../../images/logo.svg';
import { HashLink } from 'react-router-hash-link';
import './Logo.css';

function Logo() {
  return (
    <HashLink smooth to="/#project">
      <img src={logo} alt="Логотип" className="logo" />
    </HashLink>
  )
};

export default Logo;