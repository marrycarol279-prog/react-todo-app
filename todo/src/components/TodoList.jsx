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
          {tasks.map((element,index) => (
            <div key={index}>
              <input type="checkbox" onChange={(e)=>handleCheck(e)}/>
              {
              (editIndex === index ? <input type='text' onKeyDown={(e) => { if(e.key === "Enter") {Update(index,(e.target.value))} } } /> : <span>{element.task}</span>)
              }
              <button onClick = {() => del(element._id)}> Delete </button>
              <button onClick={() => edit(index,element._id)}> Edit </button>
            </div>
          ))}
        </div>
      
      </div>
    );
  }

  export default TodoList