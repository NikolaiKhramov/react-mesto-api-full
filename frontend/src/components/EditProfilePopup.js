import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, loadingState }) {

  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({
    name: '',
    description: ''
  });

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.description
    });
  }

  useEffect(() => {
    setValues({
      name: currentUser.name,
      description: currentUser.about,
    });
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name={'edit-profile'}
      title={'Редактировать профиль'}
      buttonContent={loadingState ? 'Сохранение...' : 'Сохранить'}
    >
      <fieldset className="form__fieldset">
        <input
          onChange={handleChange}
          value={values.name}
          id="name"
          type="text"
          className="form__input form__input_context_name"
          name="name"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span id="name-error" className="form__error"></span>
      </fieldset>
      <fieldset className="form__fieldset">
        <input
          onChange={handleChange}
          value={values.description}
          id="description"
          type="text"
          className="form__input form__input_context_description"
          name="description"
          placeholder="Ваш род деятельности"
          minLength="2"
          maxLength="200"
          required
        />
        <span id="description-error" className="form__error"></span>
      </fieldset>
    </PopupWithForm>
  )

}

export default EditProfilePopup;
