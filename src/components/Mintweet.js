import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faHeart, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const Mintweet = ({userObj, mintObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newMintweet, setNewMintweet] = useState(mintObj.text);
    const [heart, setHeart] = useState(false);
    const [newlikes, setNewlikes] = useState(mintObj.likes.includes(userObj?.email));
    const mintweetRef = doc(dbService, "mintweets", `${mintObj.id}`);
    const urlRef = ref(storageService, mintObj.attachmentUrl);

    const onDeleteClick = async () => {
        const ok = window.confirm("정말 이 게시글을 삭제하시겠습니까?");
        if(ok){
            await deleteDoc(mintweetRef);
            if(mintObj.attachmentUrl){
                await deleteObject(urlRef);
            }
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    
    const onSubmit = async (event) => {
        event.preventDefault();
        // const mintweetRef = doc(dbService, "mintweets", `${mintObj.id}`);
        await updateDoc(mintweetRef, {
            text: newMintweet,
        });
        setEditing(false);
    };

    const onChange = (event) => {
        const {target: {value},
     } = event;
     setNewMintweet(value);
    };

    const onClickLikes = async () => {
        const likesArr = [userObj.email, ...mintObj.likes];
        const chkLikesArr = mintObj.likes.includes(userObj.email);

        if(chkLikesArr) {
            const filteredLikesArr = likesArr.filter((value, index) => {
                return value !== userObj.email;
            });

            await updateDoc(mintweetRef, {
                likes: filteredLikesArr,
                activedLikes: false,
            });

            setHeart(false);
            setNewlikes(false);
        }

        if(heart === false){
            await updateDoc(mintweetRef, {
                likes: [...new Set(likesArr)],
                activedLikes: true,
            })
            setNewlikes(true);
            
        }else if(heart === true) {
            const filteredLikesArr = likesArr.filter((value, index) => {
                return value !== userObj.email;
            });

            await updateDoc(mintweetRef, {
                likes: filteredLikesArr,
                activedLikes: false,
            });
            setNewlikes(false);
        };

        setHeart(!heart);

    };



    return(
        <div className="nweet">
            <div className="nweet__contents">
            {
                editing ? (
                <>
                    <form onSubmit={onSubmit} className="nweetEdit">
                        <textarea onChange={onChange} type="text" value={newMintweet} className="formInput" rows="5" maxLength={150} autoFocus required></textarea>
                        <span>
                            <input type="submit" value="업데이트" className="formBtn"/>
                        </span>
                        
                    </form>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel    
                    </span>
                </>
                ) :(
                <>
                <div className="nweet__writer">
                {isOwner ? (
                        <img src={userObj.profilePhoto} width="50px" alt="profilePhoto" style={{backgroundImage: userObj.profilePhoto,}}/>
                ) : (
                    <img src={mintObj.profile} width="50px" alt="profilePhoto" style={{backgroundImage: mintObj.profile,}}/>  
                )} 
                { (userObj.uid === mintObj.creatorId) ? (<h3>{userObj.displayName}</h3>) : (<h3>{mintObj.creatorDisplayName}</h3>)}
                </div>
                <h4 className="nweet__contents-texts">{mintObj.text}</h4>
                {mintObj.attachmentUrl && 
                    <div className="nweet__contents-img">
                        <img className="nweetImg" src={mintObj.attachmentUrl} alt="attachmentUrl"/>
                    </div>
                    }
                    <div className="nweet__icons">
                        <span className="nweet__likes" onClick={onClickLikes}>
                            {newlikes? (
                                <FontAwesomeIcon icon={faHeart} id="likes" style={{color: "tomato"}} />
                            ) : (
                                <FontAwesomeIcon icon={faHeart} id="likes" style={{color: "white"}}/>
                            )}
                            
                            <span className="nweet__likesCount">{mintObj.likes.length} likes</span>
                        </span>   
                        <span className="nweet__comments">
                            <FontAwesomeIcon icon={faCommentDots} />
                            <span className="nweet__commetnsCount">00 coments</span>
                        </span>
                    </div>
                {isOwner && (
                    <div className="nweet__actions">
                        <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                    </div>
                )}    
            </>)

            }
            </div>
        </div>
    )
}

export default Mintweet;