import { dbService } from "fbase";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import TodoFactory from "components/TodoFactory";
import TodoList from "components/TodoList";
import MonthList from "components/MonthList";


const MyContents = ({userObj}) => {
    const [todosArr, setTodosArr] = useState([]);
    const [monthToDos, setMonthToDos] = useState([]);

    useEffect(() => {
        const quer = query(
            collection(dbService, "toDos", `${userObj.uid}`, "todo"),
            orderBy("date", "desc"),
        );
        onSnapshot(quer, (snapshot) => {
            const todoArr = snapshot.docs.map( (doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTodosArr(todoArr);
        });
        });

    useEffect(() => {
        const quer = query(
            collection(dbService, "toDos", `${userObj.uid}`, "monthTodo"),
            orderBy("date", "desc"),
        );

        onSnapshot(quer, (snapshot) => {
            const monthTodoArr = snapshot.docs.map( (doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMonthToDos(monthTodoArr);
        });
    });


    const [monthTodo, setMonthTodo] = useState("");

    const onChange = (event) => {
        const {target: {value}} = event;
        setMonthTodo(value);
    };

    const onMonthSubmit = async(e) => {
        e.preventDefault();

        if(monthTodo === ""){
            return
        };

        let date = new Date();

        const monthTodoData = {
            creatorId: userObj.uid,
            date: date.toLocaleString(),
            todoText: monthTodo,
            creatorDisplayName: userObj.displayName,
            checked: false,
        };

        try{
            await addDoc(collection(dbService, "toDos", `${userObj.uid}`, "monthTodo"), monthTodoData); 
        }catch(error){
            console.error("Error adding monthTodo:", error);
        }
    
        setMonthTodo("");
    };
        
    
    return (
        <div className="container">
            <div className="diary">
                <div className="diary__todos">
                    <TodoFactory userObj={userObj} />
                    <div className="diary__todoList">
                        {todosArr.map((todo) => (
                            <TodoList key={todo.id} userObj={userObj} todoObj={todo}/>
                        ))}
                    </div>
                </div>
                <div className="diary__monthTodos">
                    <div className="todoForm__main">
                        <div className="diary__toDo">
                            <h2 className="diary__toDo-userDN">{userObj.displayName}'s</h2>
                            <h2>Monthly To Do</h2>
                            <form className="diary__toDo-form" onSubmit={onMonthSubmit}>
                                <input type="text" onChange={onChange} value={monthTodo} minLength="2" maxLength="30" placeholder="뚜두투두" />
                                <input type="submit" value="+"/>
                            </form>
                        </div>
                    </div>
                    <div className="diary__todoList">
                        {monthToDos.map((monthTodo) => (
                            <MonthList key={monthTodo.id} monthObj={monthTodo} userObj={userObj} />
                        ))}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyContents;