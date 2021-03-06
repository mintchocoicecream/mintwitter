import { dbService } from "fbase";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Comments from "./commentLists";

const CommentWrite = ({ userObj, mintObj }) => {
    const [comment, setComment] = useState("");
    const [commentArr, SetCommentArr] = useState([]);

    const onCommentChange = (event) => {
        const {target: {value}} = event;
        setComment(value);
    };    

    const onCommentSubmit = async (event) => {
        event.preventDefault();

        if(comment === ""){
            return
        };

        let date = new Date();

        const mintweetComent = {
            text: comment,
            createdAt: date.toLocaleString(),
            creatorId: userObj.uid,
            creatorDisplayName: userObj.displayName,
            profile: userObj.profilePhoto,
            lieks: [],
            activedLikes: false,
        }

        try{
            await addDoc(collection(dbService, "mintweets", `${mintObj.id}`, "comments"), mintweetComent );
            
            // const querySnapshot = await getDocs(collection(dbService, "mintweets", `${mintObj.id}`, "comments"));
            // querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            // });       
        }catch(error){
            console.error("Error adding comments", error);
        };

        setComment("");
    };

    useEffect(() => {
        const q = query(
            collection(dbService, "mintweets", `${mintObj.id}`, "comments"),
            orderBy("createdAt"),
        );
        onSnapshot(q, (snapshot) => {
            const commentsArr = snapshot.docs.map( (doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            SetCommentArr(commentsArr);
        });
        });




    return (
        <>
            <div id="nweet__comments" className="nweet__comments">
                <div className="nweet__comments-form">
                    <span className="nweet__comments-title">??????</span>
                    <form onSubmit={onCommentSubmit}  className="comment__write">
                        <input type="text" onChange={onCommentChange} value={comment} placeholder="????????????" maxLength="120" />
                        <input type="submit" value="??????" />
                    </form>
                </div>
                
                {commentArr.map( (comment) => (
                    <Comments key={comment.id} userObj={userObj} mintObj={mintObj} commentOwner={userObj.uid === comment.creatorId} commentObj={comment} />
                ))}
                
            </div>
            
        </>

    )
}

export default CommentWrite;