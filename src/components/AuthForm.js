import { authService } from "fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [joinEmail, setJoinEmail] = useState("");
    const [joinPassword, setJoinPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    };

    const onJoinChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "joinemail"){
            setJoinEmail(value);
        }else if(name === "joinpassword"){
            setJoinPassword(value);
        }
    };

    const joinModal = document.getElementById("joinModal");
    const modalClose = document.getElementById("authForm__modal-close");

    const onClickModal = () => {
        joinModal.style.display = "flex";
    };

    modalClose.onclick = () => {
        joinModal.style.display = "none";
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;
                data = await signInWithEmailAndPassword(authService, email, password);
            console.log(data);
        }catch(error){
            console.log(error.code);
            setError(error.message)
        }
    };


    const onSignSubmit = async(event) => {
        event.preventDefault();
        try{
            let joindata;
            joindata = await createUserWithEmailAndPassword(authService, email, password);
            console.log(joindata);
        }catch(error){
            console.log(error.code);
            setError(error.message)
        }
    };


    return (
        <>
            <form onSubmit={onSubmit} className="authForm_container">
                <input className="authInput" name="email" type="email" placeholder="example@email.com" required value={email} onChange={onChange}/>
                <input className="authInput" name="password" type="password" placeholder="password" required value={password} onChange={onChange}/>
                <input className="authInput authSubmit" type="submit" value="Sign In" />
                {error && <span className="authError">{error}</span>}
            </form>
            <button className="authForm__createAccount" onClick={onClickModal}>Create Account</button>
            <div className="authForm__join-modal" id="joinModal">
                <div className="authForm__modal-closeicon">
                <span id="authForm__modal-close" class="authForm__modal-close"
            >&times;</span>
                </div>
            
                <h1>Join</h1>
                <form onSubmit={onSignSubmit} className="authForm__join-form">
                    <label for="joinEmail">Email</label>
                    <input id="joinEmail" className="authJoinInput" type="email" name="joinemail" placeholder="example@email.com" value={joinEmail} onChange={onJoinChange} required/>
                    <label for="joinPassword">Password</label>
                    <input id="joinPassword" className="authJoinInput" type="password" name="joinpassword" minLength="8" placeholder="password" value={joinPassword} onChange={onJoinChange} required/>
                    <span>
                        <input className="authJoinInput" type="submit" value="Create Acoount" />
                    </span>
                </form>
            </div>
        </>
    )
}

export default AuthForm;