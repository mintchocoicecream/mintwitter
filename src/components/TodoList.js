import React  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { deleteDoc, doc } from "firebase/firestore";
import { dbService } from "fbase";

const TodoList = ({userObj, todoObj}) => {
    const todoRef = doc(dbService, "toDos", `${userObj.uid}`, "todo", `${todoObj.id}`)

    const onTodoDelete = async() => {
        const deleteOk = window.confirm("todo를 삭제하시겠습니까?");
        if(deleteOk){
            await deleteDoc(todoRef);
        }
    }
    
    function onCheck(event) {
        event.preventDefault();
        console.log(event.target.parentElement);
    }

    return (
            <>
                <span className="diary__todoList-content">
                    <li>{todoObj.todoText}
                    </li> 
                    <span className="diary__todoList-contentIcon">
                        <span>
                            <FontAwesomeIcon icon={faCheck} width="12px" onClick={onCheck} />
                        </span>
                        <span onClick={onTodoDelete}>
                            <FontAwesomeIcon icon={faTrash} width="10px" />
                        </span>
                    </span>
                </span>

               
            </>     

    );
}

export default TodoList;