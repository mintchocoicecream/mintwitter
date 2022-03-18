import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { authService } from "fbase";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";

const Auth = () => {

    const onSocialClick = async (event) => {
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
            <FontAwesomeIcon className="auth__icon" href="#" icon={faTwitter} size="3x" style={{marginBottom: 50}}/>
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