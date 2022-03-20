import { authService } from "fbase";
import { useHistory } from "react-router-dom";
import React from "react";

const Logout = () => {

    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    

    return (
        <div className="container">
            <div className="logout__container">
                <div className="logout__form">
                    <h2>Logout</h2>
                    <div className="logout__box">
                        <span className="logout__text">아래 버튼을 클릭하시면 로그아웃이 완료됩니다.</span>
                        <span className="logout__logoutButton" onClick={onLogOutClick}>로그아웃</span>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default Logout;