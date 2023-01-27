import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, loadingState }) {

  const { values, handleChange, setValues } = useForm({
    name: '',
    link: ''
  })

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link
    });
  }

  useEffect(() => {
    setValues({
      name: '',
      link: ''
    })
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name={'new-place'}
      title={'Новое место'}
      buttonContent={loadingState ? 'Создание...' : 'Создать'}
    >
      <fieldset className="form__fieldset">
        <input
          onChange={handleChange}
          value={values.name}
          id="place-name"
          type="text"
          className="form__input form__input_context_place-name"
          name="name"
          placeholder="Название места"
          minLength="2"
          maxLength="30"
          required
        />
        <span id="place-name-error" className="form__error"></span>
      </fieldset>
      <fieldset className="form__fieldset">
        <input
          onChange={handleChange}
          value={values.link}
          id="place-link"
          type="url"
          className="form__input form__input_context_place-link"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="place-link-error" className="form__error"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
