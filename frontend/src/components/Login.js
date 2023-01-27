import { useForm } from '../hooks/useForm';

function Login({ onLogin }) {

  const { values, handleChange } = useForm({
    email: '',
    password: ''
  })

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.email, values.password);
  }

  return (
    <div className="authentication authentication__container">
      <h2 className="authentication__title">Вход</h2>
      <form className="form form_context_authentication" name="authentication" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <input
          onChange={handleChange}
          value={values.email}
          id="email"
          type="email"
          className="form__input form__input_context_authentication"
          name="email"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
        />
        <span id="email-error" className="form__error"></span>
      </fieldset>
      <fieldset className="form__fieldset">
        <input
          onChange={handleChange}
          value={values.password}
          id="password"
          type="password"
          className="form__input form__input_context_authentication"
          name="password"
          placeholder="Пароль"
          minLength="2"
          maxLength="200"
          required
        />
        <span id="passowrd-error" className="form__error"></span>
      </fieldset>
      <button className="authentication__button" type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login;
