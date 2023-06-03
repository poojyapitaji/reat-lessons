import { useEffect, useState } from 'react';
import { createContext } from 'react';
import {
  onAuthStateChangedListner,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

const defaultValue = {
  currentUser: null,
  setCurrentUser: () => null,
};

export const UserContext = createContext(defaultValue);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
      if (user) createUserDocumentFromAuth(user);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
