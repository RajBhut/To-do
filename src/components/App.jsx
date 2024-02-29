
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
//var globleid = localStorage.getItem('todos')[0].id;

    const [todos, setTodos] = useState([])
    const [task, setTask] = useState('')
    
   
    useEffect(()=>{
        const localTodos = localStorage.getItem('todos');
        if(localTodos){
            setTodos(JSON.parse(localTodos))
        }
    }, [])

    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    function createTodo(ev) {
        ev.preventDefault()
        setTask('')

        setTodos((oldtodos) => { 
            if(task === ""){
                return [...oldtodos]
            } else {
                const newtodo = {todo:task , id : Date.now()}
                return [...oldtodos,newtodo]
            }
        })  
    }

    function deleteitem(itemID)    {
        setTodos((oldtodos) => oldtodos.filter( item => item.id != itemID))
    }

return <div>
        <h1>What To Do?</h1>
        <form action="" onSubmit={createTodo}>
            <div className='lable'>
        <input className='in' type="text" value={task} onChange={event => setTask(event.target.value)} />
        <button className='sub' type='submit'>enter</button>
        </div>
        <ul>
            {
               todos.map((item, index) => { return <div key={item.id}>
                    <li ><div className='con'> { item.todo}  </div> <input className ="ch"type="checkbox"  onChange={(event)=>{
                        if(event.target.checked){
                            
                            setTimeout(()=>deleteitem(item.id),500)
                            // deleteitem(item.id);
                        }
                    }}/>   </li> 
                
                
                </div>})
               
            }
        </ul>
</form>
    </div>

}

export default App
