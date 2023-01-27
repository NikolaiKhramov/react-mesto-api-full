import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { defaultCurrentUser, CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltipPopup';
import ProtectedRoute from './ProtectedRoute';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(defaultCurrentUser);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [loggedUserEmail, setLoggedUserEmail] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const history = useHistory();
  const isAnyPopupOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen || isInfoTooltipOpened;
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (isLogged) {
      api.getContent(token)
      .then(([initialCards, userData]) => {
        setCards(initialCards);
        setCurrentUser(userData.foundUser);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
    }
  }, [isLogged, token]);

  useEffect(() => {
    function closePopupByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isAnyPopupOpen) {
      document.addEventListener('keydown', closePopupByEscape);
      return () => {
        document.removeEventListener('keydown', closePopupByEscape);
      }
    }
  }, [isAnyPopupOpen]);

  useEffect(() => {
    checkIfTokenIsValid(token);
  }, [token]);

  function handleEditProfilePopup() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlacePopup() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopup() {
    setEditAvatarPopupOpen(true);
  }

  function handleImagePopup() {
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpened(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    handleImagePopup();
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked, token)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleDeleteCard(cardToDelete) {
    api.deletePlaceCard(cardToDelete._id, token)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== cardToDelete._id));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    console.log(userData);
    api.editProfileInfo(userData, token)
      .then((userDataUpdated) => {
        setCurrentUser(userDataUpdated.userUpdated);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAvatarUpdate(userAvatar) {
    setIsLoading(true);
    api.editUserAvatar(userAvatar, token)
      .then((userAvatarUpdated) => {
        setCurrentUser(userAvatarUpdated.userUpdated);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlace(cardData) {
    setIsLoading(true);
    api.addNewPlaceCard(cardData, token)
      .then((cardAdded) => {
        console.log(cardAdded);
        setCards([cardAdded, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegistration(email, password) {
    api.signUp(email, password)
      .then(() => {
        setRegistrationStatus(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        setRegistrationStatus(false);
      })
      .finally(() => {
        setIsInfoTooltipOpened(true);
      });
  }

  function handleUserLogin(email, password) {
    api.signIn(email, password)
      .then((data) => {
        if (!data.jwtToken) return;

        localStorage.setItem('jwt', data.jwtToken);
        setLoggedUserEmail(email);
        setIsLogged(true);
        history.push('/')
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`)
      });
  }

  function handleUserLogout() {
    localStorage.removeItem('jwt');
    setIsLogged(false);
    history.push('/sign-in');
  }

  function checkIfTokenIsValid(jwt) {
    if (!token) return;

    api.tokenCheck(jwt)
      .then((data) => {
        setLoggedUserEmail(data.foundUser.email);
        setIsLogged(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`)
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/sign-in">
            <Header/>
            <Login onLogin={handleUserLogin}/>
          </Route>
          <Route path="/sign-up">
            <Header/>
            <Register
              onRegister={handleRegistration}
            />
          </Route>
          <ProtectedRoute path="/" loggedIn={isLogged}>
            <Header
              loggedUser={loggedUserEmail}
              onLogout={handleUserLogout}
            />
            <Main
              cards={cards}
              onEditProfile={handleEditProfilePopup}
              onAddPlace={handleAddPlacePopup}
              onEditAvatar={handleEditAvatarPopup}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCard}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              loadingState={isLoading}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlace}
              loadingState={isLoading}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onAvatarUpdate={handleAvatarUpdate}
              loadingState={isLoading}
            />
            <ImagePopup
              isOpen={isImagePopupOpen}
              onClose={closeAllPopups}
              card={selectedCard}
            />
          </ProtectedRoute>
        </Switch>
        <Footer />
        <InfoTooltip
          registrationStatus={registrationStatus}
          isOpen={isInfoTooltipOpened}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
