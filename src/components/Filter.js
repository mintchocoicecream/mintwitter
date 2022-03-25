import React from "react";
// import { dbService } from "fbase";
// import { collection } from "firebase/firestore";

function Filter(userObj) {
    // const tweetCollectionRef = collection(dbService, 'mintweets');

    return(
        <div className="filter">
            <span>All</span>
            <span>내 글보기</span>
        </div>
    );
}

export default Filter;