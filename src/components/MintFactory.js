import { dbService, storageService } from "fbase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadString} from "firebase/storage";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const MintFactory = ({ userObj }) => {
    const [mintweet, setMintweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onChange = (event) => {
        const {target: {value}} = event;
        setMintweet(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if(mintweet === ""){
            return
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
                creatorDisplayName: userObj.displayName,
                attachmentUrl,
        };

        try{
            await addDoc(collection(dbService, "mintweets"),mintweetPost);
        }catch(error){
            console.error("Error adding document:", error);
        }
        
        setAttachment("");
        setMintweet("");
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
        <div className="factoryForm__main">
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <span className="factoryInput__icons">
                        <input className="factoryInput__arrow"  type="submit" value="업로드 &rarr;" />
               </span>
                
                <textarea value={mintweet} className="factoryInput__input" type="text" placeholder="이러쿵저러쿵" onChange={onChange} rows="5" maxLength={150}>
                </textarea>
            </div>
            <div className="factoryInput__addfile">
                <label htmlFor="attach-file" className="factoryInput__label">
                    <span>
                        <FontAwesomeIcon icon={faPlus} />
                        <FontAwesomeIcon icon={faImage} />
                        <h5>image</h5>
                    </span>    
                </label>
                <input id="attach-file" type="file" accept="image/*" onChange={onFileChange}/>
            </div>

            {attachment && (
                <div className="factoryForm__attachment">
                    <img src={attachment} alt="attachment" width="400" height="300" style={{backgroundImage: attachment,}}/>
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </div>
                </div>
            )}
                
        </form>
        </div>
    )
}

export default MintFactory;