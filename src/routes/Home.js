import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import Mintweet from "components/Mintweet";

const Home = ({userObj}) => {
    const [mintweet, setMintweet] = useState("");
    const [mintweets, setMintweets] = useState([]);
    const [attachment, setAttachment] = useState();
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

    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            await addDoc(collection(dbService, "mintweets"),{
                text: mintweet,
                createdAt: serverTimestamp(),
                creatorId: userObj.uid,
            });
        }catch(error){
            console.error("Error adding document:", error);
        }
        
        setMintweet("");
    };
    const onChange = (event) => {
        const {target: {value}} = event;
        setMintweet(value);
    }
    const onFileChange = (event) => {
        const {
            target: {files},
        } = event; 
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    }
    const onClearAttachment = () => {
        setAttachment(null);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={mintweet} type="text" placeholder="What's on your min?" onChange={onChange} maxLength={120}/>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Mintweet" />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" alt="attachment"/>
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}
                
            </form>
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