import AuthForm from "components/AuthForm";
import React from "react";

const Auth = () => {

    return (
        <div className="authContainer">
            <span className="auth__icon">
                <img
                    href="#"
                    src="https://firebasestorage.googleapis.com/v0/b/mintwitter-48f72.appspot.com/o/mintchocobear.png?alt=media&token=42a42773-cc88-4b2a-a989-5e4ca420df7f"
                    width="80px"
                    alt="mintbear"
                />
            </span>
            
            <AuthForm />
        </div>
    );
};

export default Auth;