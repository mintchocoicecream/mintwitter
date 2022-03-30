import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService } from "fbase";
import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Comments = ({userObj, mintObj, commentOwner, commentObj}) => {
    const [userName, setUsername] = useState("")
    const [photo, setPhoto] = useState("");
    const commentRef = doc(dbService, "mintweets", `${mintObj.id}`, "comments", `${commentObj.id}`);
    const onCommentDeleteClick = async () => {
        const ok = window.confirm("댓글을 삭제하시겠습니까?");
        if(ok){
            await deleteDoc(commentRef);
        }
    };

    useEffect(() => {
        onSnapshot(doc(dbService, "user", `${commentObj.creatorId}`), (doc) => {
            const userData = (doc.data()); 
            setUsername(userData.displayName);
            setPhoto(userData.photo);
        });
        
    });

    return (
            <div className="comments__comment">
                <div className="comments__comment-writer">
                    <span className="comment__writer-img">
                        <img src={photo} width="30px" height="30px" alt="profileImg" />   
                    </span>
                    <span className="comment__wirter-name">{userName}</span>                 
                </div>
                <div className="comments__texts">
                    <span className="comment__text">{commentObj.text}</span>
                    {commentOwner && 
                        <span className="comment__text-delete" onClick={onCommentDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                    }
                    
                </div>
            </div>     

    );
}

export default Comments;