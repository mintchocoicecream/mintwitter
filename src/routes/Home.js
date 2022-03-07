import React, { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";

const Home = () => {
    const [mintweet, setMintweet] = useState("");
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
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={mintweet} type="text" placeholder="What's on your min?" onChange={onChange} maxLength={120}/>
                <input type="submit" value="Mintweet" />
            </form>
        </div>
    )
}

export default Home;