import React, { useState, useEffect } from "react";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [userList, setUserList] = useState([]);
  const [userCreated, setUserCreated] = useState(false);
  const userName = "audreyshelton";

  
  useEffect(() => {
    const checkOrCreateUser = async () => {
      const response = await fetch(`https://playground.4geeks.com/todo/api/users/${userName}`);

      if (response.ok) {
        setUserCreated(true);
        await fetchTodos();
      } else {
        await fetch(`https://playground.4geeks.com/todo/api/users/${userName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });
        setUserCreated(true);
      }
    };

    checkOrCreateUser();
  }, []);

  
  const fetchTodos = async () => {
    const response = await fetch(`https://playground.4geeks.com/todo/api/todos/user/${userName}`);
    const todos = await response.json();
    setUserList(todos);
  };


  const addToDo = async () => {
    if (userInput !== "" && userCreated) {
      await fetch(`https://playground.4geeks.com/todo/api/todos/user/${userName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([{ label: userInput, done: false }])
      });

      await fetchTodos();
    
      setUserInput("");
    }
  };

  
  const deleteToDo = async (index) => {
    const todoToDelete = userList[index];
    await fetch(`https://playground.4geeks.com/todo/api/todos/user/${userName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([todoToDelete])
    });

    await fetchTodos();
  };

  //makes Enter key add a todo(not working? need to fix)
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addToDo();
    }
  };

  return (
    <div className="editable">
      <div className="container">
        <h1>To-Do List</h1>
        
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={addToDo}>Add</button>

        <ul>
          {userList.map((todo, index) => (
            <li 
              key={index} 
              onClick={() => deleteToDo(index)} 
              style={{ cursor: 'pointer' }}
            >
              {todo.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
