import { authService, dbService, storageService } from "fbase";
import { updateProfile } from "firebase/auth";
import { v4 } from "uuid";
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

const Profile = ({refreshUser, userObj}) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [attachment, setAttachment] = useState("");

    if(userObj.profilePhoto === null){
        const defaultPhoto = "https://firebasestorage.googleapis.com/v0/b/mintwitter-48f72.appspot.com/o/mintchocobear.png?alt=media&token=42a42773-cc88-4b2a-a989-5e4ca420df7f";
        userObj.profilePhoto = defaultPhoto;
    };

    const onPhotoChange = (event) => {
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

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const userRef = doc(dbService, "user", `${userObj.uid}`);

        let attachmentUrl = "";
        if(attachment !== ""){
            //파일 경로 reference 만들기
            const attachmentRef = ref(storageService, `${userObj.uid}/profilePhoto/${v4()}`);
            //storage reference 경로로 파일 업로드 하기
            const response = await uploadString(attachmentRef, attachment, "data_url");
            //storage에 있는 파일 URL로 다운로드 받기
            attachmentUrl = await getDownloadURL(response.ref);
            if(userObj.profilePhoto !== attachmentUrl){
                await updateProfile(authService.currentUser, {photoURL: attachmentUrl});
                await updateDoc(userRef, {
                    photo: attachmentUrl,
                  });
            }
        }

        if(userObj.displayName !== newDisplayName){
            await updateProfile(authService.currentUser, {displayName: newDisplayName});
            await updateDoc(userRef, {
                displayName: newDisplayName,
              });
        }
        refreshUser();
        window.location.reload();
    };

    

    return (
        <div className="container">
            <div className="factoryForm__main">
                <form onSubmit={onSubmit} className="factoryForm profileForm">
                    <h2>Profile</h2>
                    <div className="factoryInput__container profile__container">
                        <div className="profile__info">
                            <span className="porfile__photoch">
                                {attachment ? (
                                        <img src={attachment} alt="attachment" width="180px" style={{backgroundImage: attachment,}}/>
                                    ) : (
                                        <img src={userObj.profilePhoto} width="180px" alt="profilePhoto" style={{backgroundImage: userObj.profilePhoto,}}/>
                                )} 
                                <span>
                                    <label htmlFor="change-file" className="chagephoto__label">사진 바꾸기</label>
                                    <input id="change-file" type="file" accept="image/*" onChange={onPhotoChange}/>
                                </span>
                            </span>
                            <span className="profile__nickname">
                                <label htmlFor="profileName">이름</label>
                                <input id="profileName" className="factoryInput__input profile__input" onChange={onChange} type="text" placeholder="Display name" autoFocus value={newDisplayName} maxLength="8"  required/>
                                <label htmlFor="profileEmail" className="profile__email">이메일</label>
                                <input id="profileEmail" className="factoryInput__input profile__input" type="text" autoFocus value={userObj.email} disabled/>
                            </span>
                        </div>
                        <input type="submit" value="프로필 저장" className="profile__arrow" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile;