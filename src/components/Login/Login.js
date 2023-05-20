import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useFormWithValidationAndRender from "../../hooks/useFormWithValidationAndRender";
import { signinForm } from "../../utils/formConfig";
import ErrorTooltip from '../ErrorTooltip/ErrorTooltip';
import Preloader from '../Preloader/Preloader';
import './Login.css'

function Login({ onLogin, isError, message, isLoading }) {

  const { renderFormInputs, isFormValid, form } = useFormWithValidationAndRender(signinForm);
  // изменить количество инпутов и параметры валидации можно в /utils/formConfig

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const login = form.email.value;
    const password = form.password.value;

    if (!login || !password) {
      return;
    }
    console.log('login data: ', login, password)
    onLogin(login, password);

    // makeFormClear();
    evt.target.reset();
  }

  return (
    <>
      <div className="login">
        <div className="login__container">
          <Logo />
          <p className="login__title">Рады видеть!</p>
          <form className="login__form" onSubmit={handleSubmit}>
            {renderFormInputs()}
            {isError && (<ErrorTooltip message={message} />)}
            {isLoading && <Preloader />}
            <button type="submit" className="login__submit" disabled={!isFormValid()}>Войти</button>
          </form>
          <div className="login__footer">
            <span className="login__question">Еще не зарегистрированы?</span>
            <Link to="/signup" className="login__link">Регистрация</Link>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login;