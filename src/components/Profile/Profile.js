import "./Profile.css";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/UseFormWithValidation";
import ErrorTooltip from "../ErrorTooltip/ErrorTooltip";
import { successMessages } from "../../utils/constants";


function Profile({ onProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const { values, handleChange, setValues, errors, isValid } = useFormWithValidation();

  useEffect(() => {
    setValues(currentUser)
  }, [currentUser])

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onProfile({ name: values.name, email: values.email });

    setIsSuccess(true);

    setTimeout(() => setIsSuccess(false), 3000);
  }

  const handleLogout = () => {
    localStorage.clear();
    onLogout();
  }


  const isDisabled = !isValid
    || ((currentUser.name === values.name) &&
      (currentUser.email === values.email));

  return (
    <section className="profile">
      <h1 className="profile__greeting">Привет, {currentUser.name.split(" ", 1)}!</h1>
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__form-container">
          <label
            htmlFor="name"
            className="profile__label
                      profile__label_place_name">Имя</label>
          <div
            className="profile__input-container 
                      profile__input-container_place_name">
            <input className="profile__input 
                              profile__input_place_name"
              id="name"
              name="name"
              type="text"
              placeholder="Имя"
              required
              value={values.name || ""}
              minLength={4}
              maxLength={30}
              pattern="[a-zA-Zа-яА-Я \-]+"
              autoComplete="off"
              onChange={handleChange}
              title="Только буквы, дефис и пробел"
            ></input>
          </div>
          <label className="profile__label
                            profile__label_place_email"
            htmlFor="email">E-mail</label>
          <div className="profile__input-container 
                          profile__input-container_place_email">
            <input className="profile__input
                              profile__input_place_email"
              id="email"
              type="email"
              name="email"
              placeholder="E-mail"
              required
              value={values.email || ""}
              onChange={handleChange}
              autoComplete="off"
            ></input>
          </div>
        </div>
        {!isValid && errors.name && <ErrorTooltip message={`Имя: ${errors.name}`} />}
        {!isValid && errors.email && <ErrorTooltip message={`Email: ${errors.email}`} />}
        {isSuccess && <ErrorTooltip isSuccess={isSuccess} message={successMessages.profile} />}
        <button
          className="profile__button-edit"
          type="submit"
          disabled={isDisabled}
        >Редактировать</button>
        <button
          className="profile__button-exit"
          onClick={handleLogout}
        >Выйти из аккаунта</button>
      </form>
    </section>
  )
};

export default Profile;
