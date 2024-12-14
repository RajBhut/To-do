// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import "./App.css";

// function App() {
//   const { userId } = useParams();
//   const [todos, setTodos] = useState([]);
//   const [task, setTask] = useState("");
//   const [is_edit, setisedit] = useState(false);
//   const [edittext, setedittext] = useState("");
//   useEffect(() => {
//     const localTodos = localStorage.getItem(`todos_${userId}`);
//     if (localTodos) {
//       setTodos(JSON.parse(localTodos));
//     }
//   }, [userId]);

//   useEffect(() => {
//     localStorage.setItem(`todos_${userId}`, JSON.stringify(todos));
//   }, [todos, userId]);

//   function createTodo(ev) {
//     ev.preventDefault();
//     if (task.trim() === "") return;

//     const newTodo = { todo: task, id: Date.now() };
//     setTodos((oldTodos) => [...oldTodos, newTodo]);
//     setTask("");
//   }

//   function deleteItem(itemId) {
//     setTimeout(() => setTodos(todos.filter((item) => item.id !== itemId)), 500);
//   }
//   function update_todo(id, con) {
//     for (let i = 0; i < todos.length; i++) {
//       if (todos[i].id === id) {
//         todos[i].todo = con;
//         setTodos((n) => [...todos]);

//         setisedit(false);
//         break;
//       }
//     }
//   }

//   return (
//     <div>
//       <center>
//         <h1>What To Do?</h1>
//         <button id="home">
//           <Link
//             style={{ textDecoration: "none", fontSize: 25, color: "white" }}
//             to="/"
//           >
//             Home
//           </Link>
//         </button>
//       </center>
//       <form onSubmit={createTodo}>
//         <div className="ap">
//           <div className="label">
//             <input
//               className="input"
//               type="text"
//               value={task}
//               onChange={(event) => setTask(event.target.value)}
//             />
//             <button className="submit" type="submit">
//               Enter
//             </button>
//           </div>

//           <ul className="user">
//             {todos.map((item) => (
//               <li id="todo" key={item.id}>
//                 <div className="con">
//                   <p>{item.todo}</p>

//                   {is_edit && (
//                     <>
//                       <input
//                         type="text"
//                         placeholder="edit todo"
//                         name=""
//                         onChange={(e) => {
//                           setedittext(e.target.value);
//                         }}
//                         className="edit"
//                       />
//                       <button
//                         onClick={() => {
//                           if (window.confirm("want to update ?"))
//                             update_todo(item.id, edittext);
//                           else setisedit(false);
//                         }}
//                       >
//                         done
//                       </button>
//                     </>
//                   )}
//                 </div>
//                 <div className="checkboxcontainer">
//                   <button
//                     onClick={() => setisedit((prv) => !prv)}
//                     style={{ height: "fit-content" }}
//                   >
//                     ✏️
//                   </button>
//                   <input
//                     className="checkbox"
//                     type="checkbox"
//                     onChange={() => deleteItem(item.id)}
//                   />
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Trash2, Edit3, Check, Plus } from "lucide-react";

const App = () => {
  const { userId } = useParams();
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const localTodos = localStorage.getItem(`todos_${userId}`);
    if (localTodos) {
      setTodos(JSON.parse(localTodos));
    }
  }, [userId]);

  useEffect(() => {
    localStorage.setItem(`todos_${userId}`, JSON.stringify(todos));
  }, [todos, userId]);

  const createTodo = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    const newTodo = {
      todo: task,
      id: Date.now(),
      createdAt: new Date().toLocaleString(),
    };
    setTodos((oldTodos) => [...oldTodos, newTodo]);
    setTask("");
  };

  const deleteTodo = (itemId) => {
    setTodos(todos.filter((item) => item.id !== itemId));
  };

  const updateTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, todo: editText } : todo
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Todo List</h1>
        <Link
          to="/"
          className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition"
        >
          Home
        </Link>
      </div>

      <form onSubmit={createTodo} className="flex mb-6">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
        >
          <Plus size={20} />
        </button>
      </form>

      <div className="space-y-3">
        {todos.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-gray-100 rounded-lg p-4 shadow-sm"
          >
            {editingTodo === item.id ? (
              <div className="flex flex-grow items-center space-x-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-grow px-2 py-1 border rounded"
                />
                <button
                  onClick={() => updateTodo(item.id)}
                  className="text-green-500 hover:bg-green-100 rounded-full p-2"
                >
                  <Check size={20} />
                </button>
              </div>
            ) : (
              <div className="flex-grow">
                <p className="text-gray-800">{item.todo}</p>
                <small className="text-gray-500 text-xs">
                  Created: {item.createdAt}
                </small>
              </div>
            )}

            {editingTodo !== item.id && (
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingTodo(item.id);
                    setEditText(item.todo);
                  }}
                  className="text-blue-500 hover:bg-blue-100 rounded-full p-2"
                >
                  <Edit3 size={20} />
                </button>
                <button
                  onClick={() => deleteTodo(item.id)}
                  className="text-red-500 hover:bg-red-100 rounded-full p-2"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
