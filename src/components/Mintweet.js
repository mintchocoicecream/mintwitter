import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";

const Mintweet = ({mintObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newMintweet, setNewMintweet] = useState(mintObj.text);
    const mintweetRef = doc(dbService, "mintweets", `${mintObj.id}`);
    const urlRef = ref(storageService, mintObj.attachmentUrl);
    const onDeleteClick = async () => {
        const ok = window.confirm("정말 이 게시글을 삭제하시겠습니까?");
        if(ok){
            await deleteDoc(mintweetRef);
            await deleteObject(urlRef);
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
        <div>
            {
                editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} type="text" value={newMintweet} required/>
                        <input type="submit" value="Update Mintweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
                ) :(
                <>
                <h4>{mintObj.text}</h4>
                {mintObj.attachmentUrl && <img src={mintObj.attachmentUrl} width="50px" height="50px" alt="attachmentUrl"/>}
                {isOwner && (
                    <>
                        <button onClick={toggleEditing}>Edit</button>
                        <button onClick={onDeleteClick}>Delete</button>
                    </>
                )}    
            </>)

            }
        </div>
    )
}

export default Mintweet;