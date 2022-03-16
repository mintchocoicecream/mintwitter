import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navigation = ({userObj}) => {
    if(userObj.displayName === null){
        const name= "Anonymous";
        userObj.displayName = name;
    }
    return(
        <nav>
            <ul className="navUl">
                <li>
                    <Link to="/" className="navHome">
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
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
                            post
                        </span>
                    </Link>
                </li>
                
                
            </ul>
        </nav>
    )
}

export default Navigation;