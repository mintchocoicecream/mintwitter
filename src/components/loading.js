import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Loading(){
    return(
        <div className="loading">
            <img src="https://firebasestorage.googleapis.com/v0/b/mintwitter-48f72.appspot.com/o/mintchocobear.png?alt=media&token=42a42773-cc88-4b2a-a989-5e4ca420df7f" width="100px" height="100px" alt="mintbear" />
            <span className="loading__text">peace...</span>
            <span className="loading__icon">
                <FontAwesomeIcon icon={faSpinner} />
            </span>
            
        </div>
    )
}

export default Loading;