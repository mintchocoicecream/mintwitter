import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import Loading from './loading';
import {authService} from "fbase";
import { updateCurrentUser } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect( () => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          profilePhoto: user.photoURL,
          email: user.email,
          updateProfile: (args) => updateCurrentUser(user, {displayName: user.displayName, profilePhoto: user.photoURL, uemail: user.email}),
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
      uemail: user.email,
      updateProfile: (args) => updateCurrentUser(user, {displayName: user.displayName, profilePhoto: user.photoURL, uemail: user.email}),
    });
  }

  useEffect(() => {
    return () => setInit(false);
  }, []);

  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> : <Loading />}
    </>
    );
}

export default App;
