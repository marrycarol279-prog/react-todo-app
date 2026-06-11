import React, { useState } from 'react';
import './Home.css';
import TodoList from '../components/TodoList';
import TodoItem from '../components/TodoItem';

const Home = () => {
  let inputList = ["Buy groceries","Finish project","Run a Errand"];
  const[tasks, setTasks] = useState([inputList]);
  const[input, setInput] = useState("");
  
  function handleAdd(){
    inputList.push(input) 
    setTasks(inputList)
  }

  return (
    <>
      <div id="home">

        <h1 id="title">
          My Tasks
        </h1>
       
        <button id="AddTask-btn" onClick={()=>handleAdd()}>
          Add Task
        </button>

      </div>

      <div id="inputArea">
        <TodoList tasks={tasks}/>
        <input id="Input" type="text" value={input} placeholder='Add Your Task.....' onChange={(event) => setInput(event.target.value)}/>
      </div>
      
    </>
  );
};

export default Home;