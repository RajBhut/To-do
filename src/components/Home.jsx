// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import "./Home.css"

// function Home() {
//     const [users, setUsers] = useState([]);
//     const [input, setInput] = useState('');

//     function addUser(event) {
//         event.preventDefault();
//         if (input.trim() === "") return;
//         const newUser = { name: input.trim(), id: Date.now() };
//         setUsers([...users, newUser]);
//         setInput('');
//     }

//     function deleteUser(userid) {
//         setUsers(users.filter(user => user.id !== userid));
//     }

//     useEffect(() => {
//         const localUsers = localStorage.getItem('users');
//         if (localUsers) {
//             setUsers(JSON.parse(localUsers));
//         }
//     }, []);

//     useEffect(() => {
//               localStorage.setItem('users', JSON.stringify(users));

//             }, [users]);

//    return(
//         <div className='bd'>
//             <div className='Header'><h1> Home</h1>
//             <form id='homeform' onSubmit={addUser}>
//             <input type="text" value={input} onChange={event => setInput(event.target.value)} id='homeinput' placeholder='Add User' /><button id='sub' type='submit'>Add user</button></form></div>
//       <div className="data">
//             <ul >
//                 {users.map(user => (
//                     <div className='container' key={user.id}>
//                         <li className='dt'>
//                             <Link style={{textDecoration : 'none' ,fontSize : 30, color: 'black'}} to={`/user/${user.id}`}>{user.name}</Link>

//                         </li> <button id='bt' onClick={() => deleteUser(user.id)}>Delete</button>
//                     </div>
//                 ))}
//             </ul>
//             </div>
//         </div>
//     );

// }

// export default Home;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Plus, Trash2 } from "lucide-react";

function Home() {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const localUsers = localStorage.getItem("users");
    if (localUsers) {
      setUsers(JSON.parse(localUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  function addUser(event) {
    event.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput === "") return;

    // Check for duplicate users
    if (
      users.some(
        (user) => user.name.toLowerCase() === trimmedInput.toLowerCase()
      )
    ) {
      alert("User already exists!");
      return;
    }

    const newUser = {
      name: trimmedInput,
      id: Date.now(),
      createdAt: new Date().toLocaleString(),
    };
    setUsers([...users, newUser]);
    setInput("");
  }

  function deleteUser(userid) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== userid));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8 border-b-2 border-blue-600 pb-4">
          Todo App Users
        </h1>

        <form onSubmit={addUser} className="flex mb-6 space-x-2">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Add New User"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition flex items-center"
          >
            <Plus size={20} className="mr-2" /> Add
          </button>
        </form>

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4">
                <User size={24} className="text-blue-500" />
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <small className="text-gray-500 text-xs">
                    Added: {user.createdAt}
                  </small>
                </div>
              </div>
              <div>
                <Link
                  to={`/user/${user.id}`}
                  className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg mr-2 hover:bg-blue-200 transition"
                >
                  Todo List
                </Link>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="text-red-500 hover:bg-red-100 p-2 rounded-full transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
