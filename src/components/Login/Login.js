import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Login.css'

function Login() {

  return (
    <>
      <div className="login">
        <div className="login__container">
          <Logo />
          <p className="login__title">Рады видеть!</p>
          <form className="login__form">
            <label className="login__label" htmlFor="email">E-mail</label>
            <input
              className="login__input"
              type="email"
              name="email"
              id="email"
              placeholder='ipetrov@ya.ru'
              required
            >
            </input>
            <label className="login__label" htmlFor="password">Пароль</label>
            <input
              className="login__input login__input-error"
              type="password"
              name="password"
              id="password"
              required
            >
            </input>
            <span className="login__error login__error_visible">Что-то пошло не так...</span>
            <button type="submit" className="login__submit">Войти</button>
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