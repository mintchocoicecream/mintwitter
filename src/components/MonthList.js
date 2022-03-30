import React, { useState }  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { deleteDoc, doc, updateDoc} from "firebase/firestore";
import { dbService } from "fbase";

const MonthList = ({userObj, monthObj}) => {
    const [monthChk, setMonthChk] = useState(false);
    const monthTodoRef = doc(dbService, "toDos", `${userObj.uid}`, "monthTodo", `${monthObj.id}`);

    const onMonthTodoDel = async() => {
        const delOk = window.confirm(`${monthObj.todoText}를 삭제하시겠습니까?`);
        if(delOk){
            await deleteDoc(monthTodoRef);
        }
    };
    
    const onMonthCheck = async() => {
        if(monthChk){
            await updateDoc(monthTodoRef, {
                checked: false,
            })
            setMonthChk(false);
        }else if(monthChk === false){
            await updateDoc(monthTodoRef, {
                checked: true,
            })
            setMonthChk(true);
        }
    };

    return (
            <>{monthObj.checked === true ? (
                <span className="diary__todoList-content diary__todoList-content-check">
                    <li>{monthObj.todoText}
                    </li> 
                    <span className="diary__todoList-contentIcon">
                        <span onClick={onMonthCheck} style={{backgroundColor:"rgb(251, 215, 245)"}}>
                            <FontAwesomeIcon icon={faCheck} width="10px" />
                        </span>
                        <span onClick={onMonthTodoDel} style={{backgroundColor:"rgb(251, 215, 245)"}}>
                            <FontAwesomeIcon icon={faTrash} width="10px" />
                        </span>
                    </span>
                </span>
            ) : (
                <span className="diary__todoList-content">
                    <li>{monthObj.todoText}
                    </li> 
                    <span className="diary__todoList-contentIcon">
                        <span onClick={onMonthCheck}>
                            <FontAwesomeIcon icon={faCheck} width="10px" />
                        </span>
                        <span onClick={onMonthTodoDel}>
                            <FontAwesomeIcon icon={faTrash} width="10px" />
                        </span>
                    </span>
                </span>
            )}
                
            </>     

    );
}

export default MonthList;