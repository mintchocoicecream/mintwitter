import { authService, dbService } from "fbase";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Profile = ({refreshUser, userObj}) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

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
    });

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
            <div className="factoryForm__main">
                <form onSubmit={onSubmit} className="factoryForm profileForm">
                    <h2>Profile</h2>
                    <div className="factoryInput__container profile__container">
                        <div className="profile__icon">
                            <img src={require("../css/image/mintchocobear.png")} width="64px" alt="mintbear" />
                        </div>
                            
                        <span>
                            <label htmlFor="profileName">이름</label>
                            <input id="profileName" className="factoryInput__input" onChange={onChange} type="text" placeholder="Display name" autoFocus value={newDisplayName} maxLength="8"  required/>
                        </span>
                        <span className="factoryInput__icons">
                            <input type="submit" value="프로필 저장" className="factoryInput__arrow" />
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile;