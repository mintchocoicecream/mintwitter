import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query, where} from "firebase/firestore";
import Mintweet from "components/Mintweet";
import MintFactory from "components/MintFactory";

const Home = ({userObj}) => {
    const [mintweets, setMintweets] = useState([]);
    const [onall, setOnAll] = useState(false);
    const [mydata, setMydata] = useState([]);
    

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
    });

    const onAll = () => {
        if(onall === true){
            setOnAll(false);
        }
    }

    const onMycontent = async() => {
        const quer = query(
            collection(dbService, "mintweets"), 
            where("creatorId", "==", `${userObj.uid}`),
            orderBy("createdAt", "desc"),
            );
        if(onall === false){
            setOnAll(true);
        };
        onSnapshot(quer, (snapst) => {
            const myTweetArr = snapst.docs.map( (doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMydata(myTweetArr);
        });
    }

    
    return (
        <div className="container">
            <MintFactory userObj={userObj}/>
            <div className="filter">
                <span onClick={onAll}>All</span>
                <span onClick={onMycontent}>내 글보기</span>
            </div>  
            <div className="homeDiv">
                {
                    onall ? (
                        <>
                        {mydata.map((mydata) => (
                            <Mintweet key={mydata.id} userObj={userObj} mintObj={mydata} isOwner={mydata.creatorId === userObj.uid}/>
                        ))}
                        </>
                    ) : (
                        <>
                        {mintweets.map( (mintweet) => (
                            <Mintweet key={mintweet.id} userObj={userObj} mintObj={mintweet} isOwner={mintweet.creatorId === userObj.uid}/>
                            )
                        )}
                        </>
                    )
                }
                
                
            </div>
        </div>
    )
}

export default Home;