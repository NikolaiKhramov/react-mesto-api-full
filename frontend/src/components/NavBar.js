import { Route, Link } from 'react-router-dom';

function NavBar({ loggedUser, onLogout }) {
  return (
    <>
    <Route exact path="/">
      <div className="navBar navBar_type_logged">
        <p className="navBar__username">{loggedUser}</p>
        <button className="navBar__button" type="button" onClick={onLogout}>Выйти</button>
      </div>
    </Route>
    <Route path="/sign-in">
      <div className="navBar">
        <Link to="/sign-up" className="navBar__link">Регистрация</Link>
      </div>
    </Route>
    <Route path="/sign-up">
      <div className="navBar">
        <Link to="/sign-in" className="navBar__link">Войти</Link>
      </div>
    </Route>
    </>
  )
}

export default NavBar;
