import { dbService } from "fbase";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";


const MyContents = ({userObj}) => {
    const [todo, setTodos] = useState("");

    const onChange = (event) => {
        const {target: {value}} = event;
        setTodos(value);
    };

    const onSubmit = async(e) => {
        e.preventDefault();


        if(todo===""){
            return
        };

        let date = new Date();

        const todoData = {
            creatorId: userObj.uid,
            date: date.toLocaleString(),
            todoText: todo,
            creatorDisplayName: userObj.displayName,
        };

        try{
            await addDoc(collection(dbService, "toDos", `${userObj.uid}`, "todo"), todoData );   
            const querySnapshot = await getDocs(collection(dbService, "toDos", `${userObj.uid}`, "todo"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            }); 
        }catch(error){
            console.error("Error adding Tododocument:", error);
        }
    
        setTodos("");
    }
    const [todosArr, setTodosArr] = useState([]);

    

    useEffect(() => {
        const q = query(
            collection(dbService, "toDos", `${userObj.uid}`, "todo"),
            orderBy("createdAt", "desc"),
        );
        onSnapshot(q, (snapshot) => {
            const commentsArr = snapshot.docs.map( (doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTodosArr(commentsArr);
        });
        });


    
    return (
        <div className="container">
            <div className="diary">
                <div className="diary__toDo">
                    <h2>To Do</h2>
                    <form className="diary__toDo-form" onSubmit={onSubmit}>
                        <input type="text" value={todo} onChange={onChange} minLength="2" maxLength="30" placeholder="계획이란,,," />
                        <input type="submit" value="저장"/>
                    </form>
                    <ul className="diary__toDos">
                    </ul>
                </div>
                <div className="diary__complete">
                    <h2>Complete</h2>
                </div>
            </div>
        </div>
    )
}

export default MyContents;