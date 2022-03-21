import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import {authService} from "fbase";
import { updateCurrentUser } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          profilePhoto: user.photoURL,
          updateProfile: (args) => updateCurrentUser(user, {displayName: user.displayName, profilePhoto: user.photoURL}),
        });
      }else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      profilePhoto: user.photoURL,
      updateProfile: (args) => updateCurrentUser(user, {displayName: user.displayName, profilePhoto: user.photoURL}),
    });
  }

  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing..."}
    </>
    );
}

export default App;
