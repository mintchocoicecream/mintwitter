import React, { useState } from "react";

const Home = () => {
    const [mintweet, setMintweet] = useState("");
    const onSubmit = (event) => {
        event.preventDefault(); 
    };
    const onChange = (event) => {
        const {target: {value}} = event;
        setMintweet(value);
    }
    return (
        <div>
            <form>
                <input value={mintweet} type="text" placeholder="What's on your min?" onChange={onChange} maxLength={120}/>
                <input type="submit" value="Mintweet" />
            </form>
        </div>
    )
}

export default Home;