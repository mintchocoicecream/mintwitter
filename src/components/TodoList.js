import React, { useState }  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "fbase";

const TodoList = ({userObj, todoObj}) => {
    const todoRef = doc(dbService, "toDos", `${userObj.uid}`, "todo", `${todoObj.id}`)
    const [checked, setChecked] = useState(false);


    const onTodoDelete = async() => {
        const deleteOk = window.confirm("todo를 삭제하시겠습니까?");
        if(deleteOk){
            await deleteDoc(todoRef);
        }
    }
    
    const onCheck = async() => {
        if(checked){
            await updateDoc(todoRef,{
                checked: false,
            })
            setChecked(false);
        } else if(!checked){
            await updateDoc(todoRef, {
                checked: true,
            })
            setChecked(true);
        };
    }

    return (
            <>
            {todoObj.checked === true ?
                (
                <span className="diary__todoList-content diary__todoList-content-check ">
                    <li>{todoObj.todoText}
                    </li> 
                    <span className="diary__todoList-contentIcon">
                        <span onClick={onCheck} style={{backgroundColor:"rgb(251, 215, 245)"}}>
                            <FontAwesomeIcon icon={faCheck} width="10px" />
                        </span>
                        <span onClick={onTodoDelete} style={{backgroundColor:"rgb(251, 215, 245)"}}>
                            <FontAwesomeIcon icon={faTrash} width="10px" />
                        </span>
                    </span>
                </span>
                ) : (
                    <span className="diary__todoList-content">
                        <li>{todoObj.todoText}
                        </li> 
                        <span className="diary__todoList-contentIcon">
                            <span onClick={onCheck}>
                                <FontAwesomeIcon icon={faCheck} width="10px" />
                            </span>
                            <span onClick={onTodoDelete}>
                                <FontAwesomeIcon icon={faTrash} width="10px" />
                            </span>
                        </span>
                    </span>
                )
            }
                

               
            </>     

    );
}

export default TodoList;