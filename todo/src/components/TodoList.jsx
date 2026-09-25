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
      <div className="task-list">
        <h2>Your Task</h2>

        <div className="task-items">
          {tasks.map((element,index) => (
            <div className="task-item" key={element._id ?? index}>
              <label className="task-check">
                <input type="checkbox" onChange={(e)=>handleCheck(e)}/>
                <span className="checkmark" aria-hidden="true" />
              </label>

              {
              (editIndex === index ? <input className='task-edit-input' type='text' onKeyDown={(e) => { if(e.key === "Enter") {Update(index,(e.target.value))} } } /> : <span className="task-text">{element.task}</span>)
              }

              <div className="task-actions">
                <button className="task-action delete" onClick = {() => del(element._id)}>Delete</button>
                <button className="task-action edit" onClick={() => edit(index,element._id)}>Edit</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    );
  }

  export default TodoList