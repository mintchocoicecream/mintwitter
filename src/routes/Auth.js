import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { authService, dbService } from "fbase";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";

const Auth = () => {
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
        <div className="authContainer">
            <span className="auth__icon">
                <img
                    href="#"
                    src="https://firebasestorage.googleapis.com/v0/b/mintwitter-48f72.appspot.com/o/bmIxu1GQILVa4E0ykhOS5cJpu8i1%2FprofilePhoto%2Fmintchocobear.png?alt=media&token=3ef3d496-4d4f-4633-b1a4-8ba889a57615"
                    width="80px"
                    alt="mintbear"
                />
            </span>
            
            <AuthForm />
            <div className="authBtns">
                <button className="authBtn" onClick={onSocialClick} name="google">
                   <FontAwesomeIcon className="authBtnIcon" icon={faGoogle} size="lg" />Sign In with Google 
                </button>
                <button className="authBtn" onClick={onSocialClick} name="github" >
                    <FontAwesomeIcon icon={faGithub} className="authBtnIcon github" size="lg" />Sign In with Github 
                </button>
            </div>
        </div>
    );
};

export default Auth;