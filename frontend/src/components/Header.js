import logo from '../images/logo.svg';
import NavBar from './NavBar';

function Header({ type, loggedUser, onLogout }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место" className="header__logo" />
      <NavBar
        type={type}
        loggedUser={loggedUser}
        onLogout={onLogout}
      />
    </header>
  );
}

export default Header;
