import { dbService, storageService } from "fbase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadString} from "firebase/storage";
import { v4 } from "uuid";
import React, { useState } from "react";

const MintFactory = ({ userObj }) => {
    const [mintweet, setMintweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();
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
        setAttachment(null);
    };

    return (
        <form onSubmit={onSubmit}>
                <input value={mintweet} type="text" placeholder="What's on your min?" onChange={onChange} maxLength={120}/>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Mintweet" />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" alt="attachment"/>
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}
                
            </form>
    )
}

export default MintFactory;