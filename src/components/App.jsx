import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './App.css';

function App() {
    const { userId } = useParams();
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        const localTodos = localStorage.getItem(`todos_${userId}`);
        if (localTodos) {
            setTodos(JSON.parse(localTodos));
        }
    }, [userId]);

    useEffect(() => {
        localStorage.setItem(`todos_${userId}`, JSON.stringify(todos));
    }, [todos, userId]);

    function createTodo(ev) {
        ev.preventDefault();
        if (task.trim() === "") return;
        
        const newTodo = { todo: task, id: Date.now() };
        setTodos((oldTodos) => [...oldTodos, newTodo]);
        setTask('');
    }

    function deleteItem(itemId) {
        setTimeout(()=>setTodos(todos.filter((item) => item.id !== itemId)) , 500 )
        
      
       
       
      }

    return (
        <div>
            <center><h1>What To Do?</h1><Link to="/">Home</Link></center>
            <form onSubmit={createTodo}>
                <div className='label'>
                    <input className='input' type="text" value={task} onChange={event => setTask(event.target.value)} />
                    <button className='submit' type='submit'>Enter</button>
                </div>
                <ul>
                    {todos.map((item) => (
                        <li key={item.id}>
                            <div className='con'>{item.todo}</div>
                            <input className="checkbox" type="checkbox" onChange={() => deleteItem(item.id)} />
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    );
}

export default App;
