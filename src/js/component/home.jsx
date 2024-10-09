import React, { useState } from "react";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [userList, setUserList] = useState([]);

  const addToDo = () => {
    if (userInput !== "") {
      setUserList([...userList, userInput]);
      setUserInput("");
    }
  };

  const deleteToDo = (index) => {
    setUserList(userList.filter((_, i) => i !== index));
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
          {userList.map((todo, index) => (
            <li 
              key={index} 
              onClick={() => deleteToDo(index)} 
              style={{ cursor: 'pointer' }}
            >
              {todo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
