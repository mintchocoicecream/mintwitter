import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPenToSquare, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navigation = ({userObj}) => {


    if(userObj.displayName === null){
        const name= "Anonymous";
        userObj.displayName = name;
    };

    return(
        <>
            <nav>
                <ul className="navUl">
                    <li>
                        <Link to="/" className="navHome">
                            <FontAwesomeIcon icon={faTwitter} size="2x" />
                            <span>
                                Home
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link className="navProfile" to="/profile">
                            <FontAwesomeIcon icon={faUser} size="2x" />
                            <span className="userName">{userObj.displayName}'s</span>
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="navDiary" to="/myContents">
                            <FontAwesomeIcon icon={faPenToSquare} size="2x" />
                            <span className="userName">
                               {userObj.displayName}'s
                            </span>
                            <span>Diary</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="navLogout" to="/logout">
                            <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
                            <span>
                                Logout
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navigation;