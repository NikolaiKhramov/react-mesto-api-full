function PopupWithForm({ name, title, buttonContent, children, isOpen, onClose, onSubmit }) {
  const visibilityState = isOpen ? 'popup_opened' : '';

  return (
    <div className={`popup popup_context_${name} ${visibilityState}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-btn" onClick={onClose}></button>
        <h2 className="popup__purpose">{title}</h2>
        <form className={`form form_context_${name}`} name={`${name}`} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__button">{buttonContent}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
