import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import TodoFactory from "components/TodoFactory";
import TodoList from "components/TodoList";


const MyContents = ({userObj}) => {
    
    const [todosArr, setTodosArr] = useState([]);

    useEffect(() => {
        const quer = query(
            collection(dbService, "toDos", `${userObj.uid}`, "todo"),
            orderBy("date", "desc"),
        );
        onSnapshot(quer, (snapshot) => {
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
                <div className="diary__todos">
                 <TodoFactory userObj={userObj} />
                 <div className="diary__todoList">
                    {todosArr.map((todo) => (
                        <TodoList key={todo.id} userObj={userObj} todoObj={todo} todoisOwner={todo.creatorId === userObj.uid}/>
                    ))}
                 </div>
                 
                </div>
                
                
                <div className="diary__complete">
                    <h2>Complete</h2>
                    <div className="diary__todoList diary__completes">
                        <span className="diary__todoList-content">
                            <li>Test Sample</li> 
                            <span className="diary__todoList-contentIcon">
                                <FontAwesomeIcon icon={faTrash} width="10px" />
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyContents;