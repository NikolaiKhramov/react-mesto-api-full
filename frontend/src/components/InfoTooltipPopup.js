import success from '../images/Success.svg';
import fail from '../images/Fail.svg';

function InfoTooltip({ registrationStatus, isOpen, onClose }) {
  const visibilityState = isOpen ? 'popup_opened' : '';
  const statusImage = registrationStatus ? success : fail;
  const statusText = registrationStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.';

  return (
    <div className={`popup popup_context_confirm-place-deletion ${visibilityState}`}>
      <div className="popup__container tooltip">
        <button type="button" className="popup__close-btn" onClick={onClose}></button>
        <img className="tooltip__image" src={isOpen ? statusImage : undefined} alt="Картинка статуса регистрации"></img>
        <h2 className="popup__purpose tooltip__text">{isOpen && statusText}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
