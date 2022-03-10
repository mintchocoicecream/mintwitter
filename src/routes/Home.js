import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Mintweet from "components/Mintweet";
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
        <div>
            <MintFactory userObj={userObj}/>
            <div>
                {mintweets.map( (mintweet) => (
                    <Mintweet key={mintweet.id} mintObj={mintweet} isOwner={mintweet.creatorId === userObj.uid}/>
                    )
                )}
            </div>
        </div>
    )
}

export default Home;