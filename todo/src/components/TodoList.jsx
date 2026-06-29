  import React, { useState } from 'react'

  function TodoList({ tasks,del,edit,editIndex,Update }) {

    const [cnt, setCnt] = useState(0);

  function handleCheck(e) {

    if (e.target.checked) {
      setCnt(cnt + 1);
    }

    else {
      setCnt(cnt - 1);
    }
  }

    return (
      <div>
        <h2>Your Task</h2>
        
        <div>
          {tasks.map((task,index) => (
            <div key={index}>
              <input type="checkbox" onChange={(e)=>handleCheck(e)}/>
              {
              (editIndex === index ? <input type='text' onKeyDown={(e) => { if(e.key === "Enter") {Update(index,(e.target.value))} } } /> : <span>{task}</span>)
              }
              <button onClick = {() => del(index)}> Delete </button>
              <button onClick={() => edit(index)}> Edit </button>
            </div>
          ))}
        </div>
      
      </div>
    );
  }

  export default TodoList