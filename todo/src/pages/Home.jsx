import './Home.css';
import TodoList from '../components/TodoList';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home() {
  const navigate = useNavigate(); 
  const [tasks, setTasks] = useState([]);
  
  useEffect(() =>{
    const token = localStorage.getItem("Token");
    if(!token){
      navigate("/login", { replace: true })
      return
    }
    fetch(import.meta.env.VITE_API_URL + "/todos",{
      headers :{
        "Authorization" : `Bearer ${localStorage.getItem("Token")}`
      }
    })
    .then((response) => response.json())
    .then((data) => setTasks(data.map((element) => ({"_id":element._id,"task":element.task}))))
    .catch((error) => console.log(error)) 
  },[navigate])

  const [input, setInput] = useState('');
 
  const [index, setIndex] = useState(-1);
  
  const [id, setID] = useState();
  
  function Addbtn() {
    fetch(import.meta.env.VITE_API_URL + "/todos",{
      method: "POST",
      headers:{
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("Token")}`
      },
      body : JSON.stringify({"task" : input})
    })
    .then((response) => response.json())
    .then((data) => setTasks([...tasks, data]))
  }
  
  function deleteTask(id){
    fetch(import.meta.env.VITE_API_URL + "/todos/" + id, {
      method: "DELETE",
      headers :{
        "Authorization" : `Bearer ${localStorage.getItem("Token")}`
      }
    })
    let del = tasks.filter((element) => element._id != id);
    setTasks(del);
  }

  function edit(index,id){
    setIndex(index);
    setID(id);
  }

  function saveEdit(index,newText){
    fetch(import.meta.env.VITE_API_URL + "/todos/" + id,{
      method : "PUT",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("Token")}`
      },
      body : JSON.stringify({"task":newText})
    })
    let updated = tasks.map((element,i) => (i === index ? ({"_id":element._id,"task":newText}) : element));
    setTasks(updated);
    setIndex(-1);   
  }

  function handleSignOut() {
    localStorage.removeItem('Token')
    navigate('/login', { replace: true })
  }

  return (
    <>
    <Link to="/"> Home </Link>
    <Link to="/signUp"> Sign Up </Link>
    <Link to="/login"> Login </Link>
    <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>

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

export default Home;