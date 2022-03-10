import { dbService, storageService } from "fbase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadString} from "firebase/storage";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const MintFactory = ({ userObj }) => {
    const [mintweet, setMintweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();
        if(mintweet === ""){
            return;
        }

        let attachmentUrl = "";
        if(attachment !== ""){
            //파일 경로 reference 만들기
            const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
            //storage reference 경로로 파일 업로드 하기
            const response = await uploadString(attachmentRef, attachment, "data_url");
            //storage에 있는 파일 URL로 다운로드 받기
            attachmentUrl = await getDownloadURL(response.ref);
        }
        //트윗할 때 메시지와 사진도 같이 firestore에 생성
        const mintweetPost = {
                text: mintweet,
                createdAt: serverTimestamp(),
                creatorId: userObj.uid,
                attachmentUrl,
        };
        try{
            await addDoc(collection(dbService, "mintweets"),mintweetPost);
        }catch(error){
            console.error("Error adding document:", error);
        }
        setMintweet("");
        setAttachment("");
    };

    const onChange = (event) => {
        const {target: {value}} = event;
        setMintweet(value);
    };

    const onFileChange = (event) => {
        const {
            target: {files},
        } = event; 
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => {
        setAttachment("");
    };

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
            <input className="factoryInput__input" value={mintweet} type="text" placeholder="What's on your mind?" onChange={onChange} maxLength={120}/>
            <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>    
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file" type="file" accept="image/*" onChange={onFileChange}/>
            {attachment && (
                <div className="factoryForm__attachment">
                    <img src={attachment} alt="attachment" style={{backgroundImage: attachment,}}/>
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
                
            </form>
    )
}

export default MintFactory;