import React, { useState } from 'react';
import './Home.css';
import TodoList from '../components/TodoList';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


function home() {
  
  let inputList = [];
  
  const [tasks, setTasks] = useState(inputList);
  
  const [input, setInput] = useState("");
 
  const [index, setIndex] = useState(-1);
  
  function Addbtn() {
    setTasks([...tasks,input]);
  }
  
  function deleteTask(index){
    let del = tasks.filter((t,i) => i != index);
    setTasks(del)
  }

  function edit(i){
    setIndex(i);
  }

  function saveEdit(index,newText){
    let updated = tasks.map((task,i) => (i === index ? newText : task));
    setTasks(updated);
    setIndex(-1); 
  }

  return (
    <>
    <Link to="/"> Home </Link>
    <Link to="/signUp"> Sign Up </Link>
    <Link to="/login"> Login </Link>

      <div id="home">

        <h1 id="title">
          My Tasks
        </h1>

        <button id="AddTask-btn" onClick={() => Addbtn()}>
          Add Task
        </button>

      </div>

      <h2>Task Status</h2>
      
      <div id="status">
        <button className="status-btn">Complete</button>

        <button className="status-btn">Pending</button>

        <button className="status-btn">In Progress</button>
      </div>

      <div id="inputArea">

        <TodoList tasks={tasks} del={deleteTask} edit={edit} editIndex={index} Update={saveEdit} />

        <input id="Input" type="text" value={input} placeholder='Add Your Task.....' onChange = {(e) => setInput(e.target.value)} />

      </div>

    </>
  );
}

export default home;