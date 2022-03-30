import { authService, dbService } from "fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";

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


    const onClickModal = () => {
        const joinModal = document.getElementById("joinModal");
        joinModal.style.display = "flex";
    };

    const onClickModalClose = () => {
        const joinModal = document.getElementById("joinModal");
        joinModal.style.display = "none";
    };

    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;
                data = await signInWithEmailAndPassword(authService, email, password);
            // console.log(data);
        }catch(error){
            console.log(error.code);
            setError(error.message)
        }
    };


    const onSignSubmit = async(event) => {
        event.preventDefault();
        try{
            let joindata;
            joindata = await createUserWithEmailAndPassword(authService, joinEmail, joinPassword);
            console.log(joindata.user);
            const userData = {
                id: joindata.user.uid,
                email: joindata.user.email,
                photo: "https://firebasestorage.googleapis.com/v0/b/mintwitter-48f72.appspot.com/o/mintchocobear.png?alt=media&token=42a42773-cc88-4b2a-a989-5e4ca420df7f",
                displayName: "Anonymous",
            }
            await setDoc(doc(dbService, "user", `${joindata.user.uid}`), userData); 
        }catch(error){
            console.log(error.code);
        }
    };

    const onSocialClick = async(event) => {
        const {target: {name}} = event;
        let provider;
        if(name === "google"){
            provider = new GoogleAuthProvider();
        }else if(name === "github"){
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(authService, provider);
    };


    return (
        <>
            <form onSubmit={onSubmit} className="authForm_container">
                <input className="authInput" name="email" type="email" placeholder="example@email.com" required value={email} onChange={onChange}/>
                <input className="authInput" name="password" type="password" placeholder="password" required value={password} onChange={onChange}/>
                <input className="authInput authSubmit" type="submit" value="로그인" />
                {error && <span className="authError">{error}</span>}
            </form>
            <button className="authForm__createAccount" onClick={onClickModal}>가입하기</button>
            <div className="authForm__join-modal" id="joinModal">
                <div className="authForm__modal-closeicon">
                <span id="authForm__modal-close" onClick={onClickModalClose} className="authForm__modal-close"
            >&times;</span>
                </div>
            
                <h1>회원가입</h1>
                <form onSubmit={onSignSubmit} className="authForm__join-form">
                    <label htmlFor="joinEmail">Email</label>
                    <input id="joinEmail" className="authJoinInput" type="email" name="joinemail" placeholder="example@email.com" value={joinEmail} onChange={onJoinChange} required/>
                    <label htmlFor="joinPassword">Password</label>
                    <input id="joinPassword" className="authJoinInput" type="password" name="joinpassword" minLength="8" placeholder="password" value={joinPassword} onChange={onJoinChange} required/>
                    <span>
                        <input className="authJoinInput" type="submit" value="Create Acoount" />
                    </span>
                </form>
            </div>
            <div className="authBtns">
                <button className="authBtn" onClick={onSocialClick} name="google">
                   <FontAwesomeIcon className="authBtnIcon" icon={faGoogle} size="lg" />구글 계정으로 시작하기
                </button>
                <button className="authBtn" onClick={onSocialClick} name="github" >
                    <FontAwesomeIcon icon={faGithub} className="authBtnIcon github" size="lg" />깃허브 계정으로 시작하기
                </button>
            </div>
        </>
    )
}

export default AuthForm;