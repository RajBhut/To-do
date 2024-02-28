
import React, { useState, useEffect } from 'react';

function App() {

    const [todos, setTodos] = useState([])
    const [task, setTask] = useState('')

    function createTodo(ev) {
        ev.preventDefault()
        setTask('')
        setTodos(
            // (oldtodos) => { 
            
            // return [...oldtodos, task] })
            [...todos, task])
    }
    return <div>
        <h1>Best To todo</h1>
        <form action="" onSubmit={createTodo}>
        <input type="text" value={task} onChange={event => setTask(event.target.value)} />
        <button type='submit'>enter</button>
        <ul>
            {
                todos.map(todo => { return <li>{todo}</li> })
            }
        </ul>
</form>
    </div>

}

export default App