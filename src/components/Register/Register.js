import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useForm from "../../utils/useForm";
import { signupForm } from "../../utils/formConfig";

import './Register.css';

function Register({ onRegister }) {

  const { renderFormInputs, isFormValid, form } = useForm(signupForm);
  // изменить количество инпутов и параметры валидации можно в /utils/formConfig

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!name || !email || !password) {
      return;
    }
    console.log('registration data: ', name, email, password);
    onRegister(name, email, password);

    // makeFormClear();
    evt.target.reset();
  }

  return (
    <>
      <div className="register">
        <div className="register__container">
          <Logo />
          <p className="register__title">Добро пожаловать!</p>
          <form className="register__form" onSubmit={handleSubmit}>
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