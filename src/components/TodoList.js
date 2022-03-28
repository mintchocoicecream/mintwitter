import React  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

const TodoList = ({userObj, todoObj, todoisOwner}) => {
    // const [check, seCheck] = useState([]);
    
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
                        <FontAwesomeIcon icon={faCheck} width="12px" onClick={onCheck} />
                        <FontAwesomeIcon icon={faTrash} width="10px" />
                    </span>
                </span>

               
            </>     

    );
}

export default TodoList;