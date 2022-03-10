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
          updateProfile: (args) => updateCurrentUser(user, {displayName: user.displayName}),
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
      updateProfile: (args) => updateCurrentUser(user, {displayName: user.displayName}),
    });
  }

  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Mintwitter</footer>
    </>
    );
}

export default App;
