import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const Mintweet = ({userObj, mintObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newMintweet, setNewMintweet] = useState(mintObj.text);
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
    }
    const onChange = (event) => {
        const {target: {value},
     } = event;
     setNewMintweet(value);
    }


    return(
        <div className="nweet">
            <div className="nweet__contents">
            {
                editing ? (
                <>
                    <form onSubmit={onSubmit} className="nweetEdit">
                        <input onChange={onChange} type="text" value={newMintweet} required autoFocus className="formInput"/>
                        <input type="submit" value="Update Mintweet" className="formBtn"/>
                    </form>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel    
                    </span>
                </>
                ) :(
                <>
                <h3>{mintObj.creatorDisplayName}</h3>
                <h4>{mintObj.text}</h4>
                {mintObj.attachmentUrl && <img className="nweetImg" src={mintObj.attachmentUrl} alt="attachmentUrl"/>}
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