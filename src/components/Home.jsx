
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"

function Home() {
    const [users, setUsers] = useState([]);
    const [input, setInput] = useState('');

    function addUser(event) {
        event.preventDefault();
        if (input.trim() === "") return;
        const newUser = { name: input.trim(), id: Date.now() };
        setUsers([...users, newUser]);
        setInput('');
    }

    function deleteUser(userid) {
        setUsers(users.filter(user => user.id !== userid));
    }

    useEffect(() => {
        const localUsers = localStorage.getItem('users');
        if (localUsers) {
            setUsers(JSON.parse(localUsers));
        }
    }, []);

    useEffect(() => {
              localStorage.setItem('users', JSON.stringify(users));

            }, [users]);

   return(
        <div className='bd'>
            <div className='Header'><h1> Home</h1>
            <form id='homeform' onSubmit={addUser}>
            <input type="text" value={input} onChange={event => setInput(event.target.value)} id='homeinput' placeholder='Add User' /><button id='sub' type='submit'>Add user</button></form></div>
      <div className="data">      
            <ul >
                {users.map(user => (
                    <div className='container' key={user.id}>
                        <li className='dt'>
                            <Link style={{textDecoration : 'none' ,fontSize : 30, color: 'black'}} to={`/user/${user.id}`}>{user.name}</Link>
                           
                        </li> <button id='bt' onClick={() => deleteUser(user.id)}>Delete</button>
                    </div>
                ))}
            </ul>
            </div>
        </div>
    );
  
}

export default Home;
