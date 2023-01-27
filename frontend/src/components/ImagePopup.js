function ImagePopup({ card, isOpen, onClose }) {
  const visibilityState = isOpen ? 'popup_opened' : '';

  return (
    <div className={`popup popup_context_fullscreen-place ${visibilityState}`}>
      <figure className="fullscreen-place">
        <button type="button" className="popup__close-btn" onClick={onClose} />
        <img className="fullscreen-place__image" src={card?.link} alt={`Здесь была картинка ${card?.name}`} />
        <figcaption className="fullscreen-place__name">{card?.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;
