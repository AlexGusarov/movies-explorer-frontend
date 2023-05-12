import './Profile.css';

function Profile() {
  return (
    <section className='profile'>
      {/* На следующем этапе в заголовок будут приходить данные пользователя*/}
      <h1 className='profile__greeting'>Привет, Виталий!</h1>
      <form className='profile__form'>
        <div className='profile__form-container'>
          <label
            htmlFor='name'
            className='profile__label
                      profile__label_place_name'>Имя</label>
          <div
            className='profile__input-container 
                      profile__input-container_place_name'>
            <input className='profile__input 
                              profile__input_place_name'
              id='name'
              type='text'
              placeholder='Имя'></input>
          </div>
          <label className='profile__label
                            profile__label_place_email'
            htmlFor='email'>E-mail</label>
          <div className='profile__input-container 
                          profile__input-container_place_email'>
            <input className='profile__input
                              profile__input_place_email'
              id='email'
              type='email'
              placeholder='E-mail'></input>
          </div>
        </div>
        <button className='profile__button-edit' type='submit'>Редактировать</button>
        <button className='profile__button-exit'>Выйти из аккаунта</button>
      </form>
    </section>
  )
};

export default Profile;
