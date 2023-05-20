import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useFormWithValidationAndRender from "../../hooks/useFormWithValidationAndRender";
import { signupForm } from "../../utils/formConfig";
import ErrorTooltip from '../ErrorTooltip/ErrorTooltip';
import Preloader from '../Preloader/Preloader';

import './Register.css';

function Register({ onRegister, isError, message, isLoading }) {

  const { renderFormInputs, isFormValid, form } = useFormWithValidationAndRender(signupForm);
  // изменить количество инпутов и параметры валидации можно в /utils/formConfig

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!name || !email || !password) {
      return;
    }

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
            {isError && (<ErrorTooltip message={message} />)}
            {isLoading && <Preloader />}
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