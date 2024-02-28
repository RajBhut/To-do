
import React, { useState, useEffect } from 'react';
var globleid = 0;
function App() {


    const [todos, setTodos] = useState([])
    const [task, setTask] = useState('')

    function createTodo(ev) {
        ev.preventDefault()
        setTask('')
        setTodos(
       
            (oldtodos) => { 
            
            return [...oldtodos, {todo:task , id : globleid++}] })
            
    }
    function deleteitem(itemID)    {

        setTodos((oldtodos) => todos.filter( item => item.id != itemID))
    }
    return <div>
        <h1>Best To todo</h1>
        <form action="" onSubmit={createTodo}>
        <input type="text" value={task} onChange={event => setTask(event.target.value)} />
        <button type='submit'>enter</button>
        <ul>
            {
                todos.map((item, index) => { return <div key = {item.id}>
                    <li>{item.todo}   ({item.id})</li> 
                <button onClick={ ()=> deleteitem(item.id)}>delete</button></div>})
            }
        </ul>
</form>
    </div>

}

export default App