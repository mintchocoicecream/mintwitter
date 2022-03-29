import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService } from "fbase";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";

const Comments = ({userObj, mintObj, commentOwner, commentObj}) => {
    const commentRef = doc(dbService, "mintweets", `${mintObj.id}`, "comments", `${commentObj.id}`);
    const onCommentDeleteClick = async () => {
        const ok = window.confirm("댓글을 삭제하시겠습니까?");
        if(ok){
            await deleteDoc(commentRef);
        }
    };

    return (
            <div className="comments__comment">
                <div className="comments__comment-writer">
                    <span className="comment__writer-img">
                        {userObj.uid === commentObj.creatorId ? (
                            <img src={userObj.profilePhoto} width="30px" height="30px" alt="profileImg" />
                            ) : (
                            <img src={commentObj.profile} width="30px" height="30px" alt="profileImg" />
                        )}
                    </span>
                    {userObj.uid === commentObj.creatorId ? (
                        <span className="comment__wirter-name">{userObj.displayName}</span>
                        ) : (
                        <span className="comment__wirter-name">{commentObj.creatorDisplayName}</span>
                        )}
                    
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