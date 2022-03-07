import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

const Home = () => {
    const [mintweet, setMintweet] = useState("");
    const [mintweets, setMintweets] = useState([]);
    const getMintweets = async () => {
        const q = query(collection(dbService, "mintweets"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach( (doc) => {
            const mintweetObj = {
            ...doc.data(),
            id: doc.id,
            }
            setMintweets(prev => [mintweetObj, ...prev]);
            });
        };
    useEffect(() => {
        getMintweets();
    }, [])
    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            await addDoc(collection(dbService, "mintweets"),{
                mintweet,
                createdAt: Date.now(),
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
    console.log(mintweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={mintweet} type="text" placeholder="What's on your min?" onChange={onChange} maxLength={120}/>
                <input type="submit" value="Mintweet" />
            </form>
            <div>
                {mintweets.map( (mintweet) => (
                    <div key={mintweet.id}>
                        <h4>{mintweet.mintweet}</h4>
                    </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Home;