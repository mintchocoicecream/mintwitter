import { authService, dbService } from "fbase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({userObj}) => {
    const history = useHistory();
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

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile;