import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__user">
          <div className="profile__avatar-container">
            <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar" />
            <button className="profile__avatar-edit" type="button" onClick={onEditAvatar} />
          </div>
          <div className="profile__info">
            <h1 className="profile__info-username">{currentUser.name}</h1>
            <button className="profile__info-edit" type="button" onClick={onEditProfile} />
            <p className="profile__info-userjob">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-btn" type="button" onClick={onAddPlace} />
      </section>
      <section className="places">
        <ul className="places__list">
          {cards?.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              {...card}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
