import { dbService } from "fbase";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Comments from "./commentLists";

const CommentWrite = ({ userObj, mintObj, isOwner }) => {
    const [comment, setComment] = useState("");
    const today = new Date();   
    const year = today.getFullYear(); 
    const month = today.getMonth() + 1;  
    const date = today.getDate();  

    const onCommentChange = (event) => {
        const {target: {value}} = event;
        setComment(value);
    };

    const onCommentSubmit = async (event) => {
        event.preventDefault();

        if(comment === ""){
            return
        };

        const mintweetComent = {
            text: comment,
            createdAt: year, month, date,
            creatorId: userObj.uid,
            creatorDisplayName: userObj.displayName,
            profile: userObj.profilePhoto,
            lieks: [],
            activedLikes: false,
        }

        try{
            await addDoc(collection(dbService, "mintweets", `${mintObj.id}`, "comments"), mintweetComent );
            
            const querySnapshot = await getDocs(collection(dbService, "mintweets", `${mintObj.id}`, "comments"));
            querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            });       
        }catch(error){
            console.error("Error adding comments", error);
        };

        setComment("");
    };


    const [commentArr, SetCommentArr] = useState([]);
    useEffect(() => {
        const q = query(
            collection(dbService, "mintweets", `${mintObj.id}`, "comments"),
            orderBy("createdAt", "desc"),
        );
        onSnapshot(q, (snapshot) => {
            const commentsArr = snapshot.docs.map( (doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            SetCommentArr(commentsArr);
        });
        }, []);

    return (
        <>
            <div id="nweet__comments" className="nweet__comments">
                <div className="nweet__comments-form">
                    <span className="nweet__comments-title">댓글</span>
                    <form onSubmit={onCommentSubmit}  className="comment__write">
                        <input type="text" onChange={onCommentChange} value={comment} placeholder="Blah" maxLength="120" />
                        <input type="submit" value="입력" />
                    </form>
                </div>
                
                {commentArr.map( (comment) => (
                    <Comments userObj={userObj} mintObj={mintObj} commentOwner={userObj.uid === comment.creatorId} commentObj={comment} />
                ))}
                
            </div>
            
        </>

    )
}

export default CommentWrite;