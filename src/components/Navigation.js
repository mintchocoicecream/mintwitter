import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navigation = ({userObj}) => {
    const [activated, setActivated] = useState("");    

    useEffect(() => {
        const pages = document.location.href.split("/");
        let current = pages[4];
        if(current === ""){
            setActivated(current);
        }else if(current === "myContents"){
            setActivated(current);
        }else if(current === "profile"){
            setActivated(current);
        }else if(current === "logout"){
            setActivated(current);
        }
    }, []);

    if(userObj.displayName === null){
        const name= "Anonymous";
        userObj.displayName = name;
    };

    const onHome = () => {
        setActivated("");
    }

    const onTodo = () => {
        setActivated("myContents");
    }

    const onProfile = () => {
        setActivated("profile");
    }

    const onLogout = () => {
        setActivated("logout");
    }
    

    return(
        <>
            <nav>
                <ul className="navUl">
                    <li>
                        <Link to="/" className="navHome" onClick={onHome}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/mintwitter-48f72.appspot.com/o/mintchoco01.png?alt=media&token=b9776a6c-23fd-4f20-aedf-03abaf16bf31" width="40px" alt="home"/>
                            {activated === "" ? (
                            <span id="onhome" style={{color: "pink"}}>
                                Home
                            </span>) : (
                                <span id="onhome">
                                Home
                            </span>
                            )}
                            
                        </Link>
                    </li>
                    <li>
                        <Link className="navDiary" to="/myContents" onClick={onTodo}>
                            <FontAwesomeIcon icon={faPenToSquare} size="2x" />
                            {activated === "myContents" ? (
                                <>
                                <span className="userName" style={{color: "pink"}}>
                               {userObj.displayName}'s
                            </span>
                                <span id="ontodo" style={{color: "pink"}}>To-Do</span>
                                </>
                            ) : (
                                <>
                                <span className="userName">
                               {userObj.displayName}'s
                            </span>
                                <span id="ontodo">To-Do</span>
                                </>
                            )}
                            
                        </Link>
                    </li>
                    <li>
                        <Link className="navProfile" to="/profile" onClick={onProfile}>
                            <FontAwesomeIcon icon={faUser} size="2x" />
                            {activated === "profile" ? (
                                <>
                                <span className="userName" style={{color: "pink"}}>{userObj.displayName}'s</span>
                                <span id="onprofile" style={{color: "pink"}}>Profile</span>
                                </>
                            ) : (
                                <>
                                <span className="userName">{userObj.displayName}'s</span>
                                <span id="onprofile">Profile</span>
                                </>
                            )}
                        </Link>
                    </li>
                    <li>
                        <Link className="navLogout" to="/logout" onClick={onLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
                            {activated === "logout" ? (
                                <span id="onlogout" style={{color: "pink"}}>
                                    Logout
                                </span>
                            ) : (
                                <span id="onlogout">
                                    Logout
                                </span>
                            )}
                            
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navigation;