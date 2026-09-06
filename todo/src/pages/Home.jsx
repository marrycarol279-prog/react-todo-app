import './Home.css';
import TodoList from '../components/TodoList';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import { useEffect } from 'react';


function home() {

  const [tasks, setTasks] = useState([]);
  
  useEffect(() =>{
    fetch("http://localhost:5000/todos")
    .then((response) => response.json())
    .then((data) => setTasks(data.map((element,id) => ({"_id":element._id,"task":element.task}))))
    .catch((error) => console.log(error)) 
  },[])

  const [input, setInput] = useState();
 
  const [index, setIndex] = useState(-1);
  
  const [id, setID] = useState();
  
  function Addbtn() {
    fetch("http://localhost:5000/todos",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body : JSON.stringify({"task" : input})
    })
    .then((response) => response.json())
    .then((data) => setTasks([...tasks, data]))
  }
  
  function deleteTask(id){
    fetch("http://localhost:5000/todos/" + id, {
      method: "DELETE"
    })
    let del = tasks.filter((element) => element._id != id);
    setTasks(del);
  }

  function edit(index,id){
    setIndex(index);
    setID(id);
  }

  function saveEdit(index,newText){
    fetch("http://localhost:5000/todos/" + id,{
      method : "PUT",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({"task":newText})
    })
    let updated = tasks.map((element,i) => (i === index ? ({"_id":element._id,"task":newText}) : element));
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