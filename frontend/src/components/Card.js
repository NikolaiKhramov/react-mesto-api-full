import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, link, name, likes, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = likes.some((item) => item === currentUser._id);
  const cardLikeButtonClassName = `place__like-btn ${isLiked ? 'place__like-btn_active' : ''}`

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLikeClick() {
    onCardLike(card);
  }

  function handleCardDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="place">
      <button type="button" className="place__delete-btn" hidden={!isOwn} onClick={handleCardDeleteClick}></button>
      <div className="place__image-container"
        style={{ backgroundImage: `url(${link})` }}
        onClick={handleCardClick}
      ></div>
      <div className="place__info">
        <h2 className="place__name">{name}</h2>
        <div className="place__like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleCardLikeClick}></button>
          <span className="place__like-amount">{likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
