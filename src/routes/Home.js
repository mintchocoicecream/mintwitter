import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";

const Home = ({userObj}) => {
    const [mintweet, setMintweet] = useState("");
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
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={mintweet} type="text" placeholder="What's on your min?" onChange={onChange} maxLength={120}/>
                <input type="submit" value="Mintweet" />
            </form>
            <div>
                {mintweets.map( (mintweet) => (
                    <div key={mintweet.id}>
                        <h4>{mintweet.text}</h4>
                    </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Home;