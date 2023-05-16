import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useForm from "../../utils/useForm";
import { signupForm } from "../../utils/formConfig";

import './Register.css';

function Register() {

  const { renderFormInputs, isFormValid } = useForm(signupForm);
  // изменить количество инпутов и параметры валидации можно в /utils/formConfig

  return (
    <>
      <div className="register">
        <div className="register__container">
          <Logo />
          <p className="register__title">Добро пожаловать!</p>
          <form className="register__form" onSubmit={() => console.log('submitted')}>
            {renderFormInputs()}
            <button type="submit" className="register__submit" disabled={!isFormValid()}>Зарегистрироваться</button>
          </form>
          <div className="register__footer">
            <span className="register__question">Уже зарегистрированы?</span>
            <Link to="/signin" className="register__link">Войти</Link>
          </div>
        </div>
      </div>

    </>
  )
}

export default Register;