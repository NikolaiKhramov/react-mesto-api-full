import { createContext } from 'react';
import defaultAvatar from '../images/defaultCurrentUserAvatar.jpg'

export const defaultCurrentUser = {
  name: 'John',
  about: 'Somebody you used to know',
  avatar: defaultAvatar,
  _id: '',
}

export const CurrentUserContext = createContext(defaultCurrentUser);
