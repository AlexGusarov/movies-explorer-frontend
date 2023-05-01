import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Register() {

  return (
    <>
      <div className="register">
        <div className="register__container">
          <Logo />
          <p className="register__title">Добро пожаловать!</p>
          <form className="register__form">
            <label className="register__label" htmlFor="name">Имя</label>
            <input
              className="register__input"
              type="text"
              name="name"
              id="name"
            >
            </input>
            <span className="register__error register__error_visible"></span>
            <label className="register__label" htmlFor="email">E-mail</label>
            <input
              className="register__input"
              type="email"
              name="email"
              id="email"
            >
            </input>
            <label className="register__label" htmlFor="password">Пароль</label>
            <input
              className="register__input register__input-error"
              type="password"
              name="password"
              id="password"
            >
            </input>
            <span className="register__error register__error_visible">Что-то пошло не так...</span>
            <button type="submit" className="register__submit">Зарегистрироваться</button>
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