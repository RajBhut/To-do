
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

    return (
        <div>
            <div className='Header'><h1>I am in Home</h1>
            <form onSubmit={addUser}>
            <input type="text" value={input} onChange={event => setInput(event.target.value)} /><button type='submit'>Add user</button></form></div>
            <ul>
                {users.map(user => (
                    <div className='container' key={user.id}>
                        <li>
                            <Link to={`/user/${user.id}`}>{user.name}</Link>
                           
                        </li> <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Home;
