import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup({ isOpen, onClose, onAvatarUpdate, loadingState }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onAvatarUpdate({
      avatar: avatarRef.current.value
    })
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name={'edit-avatar'}
      title={'Обновить аватар'}
      buttonContent={loadingState ? 'Сохранение...' : 'Сохранить'}
    >
      <fieldset className="form__fieldset">
        <input
          ref={avatarRef}
          id="update-avatar"
          type="url"
          className="form__input form__input_context_avatar-link"
          name="avatar"
          placeholder="Cсылка на изображение"
          required
        />
        <span id="update-avatar-error" className="form__error"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
