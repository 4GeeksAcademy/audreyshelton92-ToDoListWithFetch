import React, { useState, useEffect } from "react";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [userList, setUserList] = useState([]);
  const [userCreated, setUserCreated] = useState(false);
  const userName = "audreyshelton";

  useEffect(() => {
    const checkOrCreateUser = async () => {
      //  'https://playground.4geeks.com/todo/users/audreyshelton'
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/audreyshelton"
      );
      if (response.ok) {
        setUserCreated(true);
        await fetchTodos();
      } else {
        await fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUserCreated(true);
      }
    };

    checkOrCreateUser();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/todo/users/audreyshelton"
    );
    const todos = await response.json();
    setUserList(todos.todos);
  };

  const addToDo = async () => {
    // https://playground.4geeks.com/todo/todos/audreyshelton
    if (userInput !== "" && userCreated) {
      await fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: userInput, done: false }),
      });

      await fetchTodos();

      setUserInput("");
    }
  };

  const deleteToDo = async (id) => {
    //  'https://playground.4geeks.com/todo/todos/1'
    await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([todoToDelete]),
    });

    await fetchTodos();
  };

  
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
          {userList?.map((todo, index) => (
            <li
              key={index}
              onClick={() => deleteToDo(todo.id)}
              style={{ cursor: "pointer" }}
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
