import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Loading(){
    return(
        <div className="loading">
            <img src="https://firebasestorage.googleapis.com/v0/b/mintwitter-48f72.appspot.com/o/bmIxu1GQILVa4E0ykhOS5cJpu8i1%2FprofilePhoto%2Fmintchocobear.png?alt=media&token=3ef3d496-4d4f-4633-b1a4-8ba889a57615" width="100px" height="100px" alt="mintbear" />
            <span className="loading__text">peace...</span>
            <span className="loading__icon">
                <FontAwesomeIcon icon={faSpinner} />
            </span>
            
        </div>
    )
}

export default Loading;