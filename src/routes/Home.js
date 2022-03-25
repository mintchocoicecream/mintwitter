import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Mintweet from "components/Mintweet";
import Filter from "components/Filter";
import MintFactory from "components/MintFactory";

const Home = ({userObj}) => {
    
    const [mintweets, setMintweets] = useState([]);
    useEffect(() => {
        const q = query(
            collection(dbService, "mintweets"),
            orderBy("createdAt", "desc"),
        );
        onSnapshot(q, (snapshot) => {
            const mintweetArr = snapshot.docs.map( (doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        setMintweets(mintweetArr);
        });
        }, []);

    
    return (
        <div className="container">
            <MintFactory userObj={userObj}/>
            <Filter userObj={userObj}/>
            <div className="homeDiv">
                {mintweets.map( (mintweet) => (
                    <Mintweet key={mintweet.id} userObj={userObj} mintObj={mintweet} isOwner={mintweet.creatorId === userObj.uid}/>
                    )
                )}
            </div>
        </div>
    )
}

export default Home;