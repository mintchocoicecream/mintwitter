import { authService, dbService } from "fbase";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const getMyTweets = async () => {
        const q = query(
        collection(dbService, "mintweets"),
        where("creatorId", "==", `${userObj.uid}`)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        });
        };

    useEffect( () => {
        getMyTweets();
    }, []);

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(authService.currentUser, {displayName: newDisplayName});
        }
        refreshUser();
    };

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input onChange={onChange} type="text" placeholder="Display name" autoFocus value={newDisplayName} className="formInput" />
                <input type="submit" value="Update Profile" className="formBtn" />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</span>
        </div>
    )
}

export default Profile;