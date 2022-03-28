import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

const TodoFactory = ({ userObj }) => {
    const [todo, setTodos] = useState("");

    const onChange = (event) => {
        const {target: {value}} = event;
        setTodos(value);
    };

    const onSubmit = async(e) => {
        e.preventDefault();

        if(todo === ""){
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
            await addDoc(collection(dbService, "toDos", `${userObj.uid}`, "todo"), todoData); 
        }catch(error){
            console.error("Error adding Tododocument:", error);
        }
    
        setTodos("");
    }
    
    return (
        <div className="todoForm__main">
            <div className="diary__toDo">
                <h2>To Do</h2>
                <form className="diary__toDo-form" onSubmit={onSubmit}>
                    <input type="text" value={todo} onChange={onChange} minLength="2" maxLength="30" placeholder="뚜두투두" />
                    <input type="submit" value="+"/>
                </form>
            </div>
        </div>
    )
}


export default TodoFactory;