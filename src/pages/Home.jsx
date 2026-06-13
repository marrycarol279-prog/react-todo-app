import React, { useState } from 'react';
import './Home.css';
import TodoList from '../components/TodoList';
import { Links } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


function home() {
  
  let inputList = ["Buy groceries", "Finish project", "Run a Errand"];
  
  const [tasks, setTasks] = useState([inputList]);
  
  console.log(tasks)
  
  const [input, setInput] = useState("");
  
  function Addbtn() {
    setTasks([...inputList,input]);
  }

  return (
    <>
      <div id="home">

        <h1 id="title">
          My Tasks
        </h1>

        <button id="AddTask-btn" onClick={() => Addbtn()}>
          Add Task
        </button>

      </div>

      <h2>Task Complete</h2>

      <div id="inputArea">

        <TodoList tasks={tasks} />

        <input id="Input" type="text" value={input} placeholder='Add Your Task.....' onChange = {(e) => setInput(e.target.value)} />

      </div>

    </>
  );
}

export default home;