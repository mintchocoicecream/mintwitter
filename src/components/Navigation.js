import React from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPenToSquare, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navigation = ({userObj}) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };


    if(userObj.displayName === null){
        const name= "Anonymous";
        userObj.displayName = name;
    };

    return(
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
                        <span>
                            {userObj.displayName? `${userObj.displayName}'s Profile` : "Profile" }</span>
                    </Link>
                </li>
                <li>
                    <Link className="navWrite" to="/">
                        <FontAwesomeIcon icon={faPenToSquare} size="2x" />
                        <span>
                            Post
                        </span>
                    </Link>
                </li>
                <li>
                    <span className="navLogout" onClick={onLogOutClick}>
                        <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
                        <span>
                            Logout
                        </span>
                    </span>
                </li>
                
                
            </ul>
        </nav>
    )
}

export default Navigation;