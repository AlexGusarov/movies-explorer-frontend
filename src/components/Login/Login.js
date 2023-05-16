import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useForm from "../../utils/useForm";
import { signinForm } from "../../utils/formConfig";
import './Login.css'

function Login() {

  const { renderFormInputs, isFormValid } = useForm(signinForm);
  // изменить количество инпутов и параметры валидации можно в /utils/formConfig

  return (
    <>
      <div className="login">
        <div className="login__container">
          <Logo />
          <p className="login__title">Рады видеть!</p>
          <form className="login__form">
            {renderFormInputs()}
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