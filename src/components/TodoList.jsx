import React, { useState } from 'react'

const TodoList = ({ tasks }) => {
  
  const [cnt, setCnt] = useState(0);
  
  // console.log(tasks)

  function handleCheck(e) {
    if (e.target.checked) {
      let add = cnt + 1
      setCnt(add)
    }
    if(!e.target.checked){
      let minus = cnt- 1
      setCnt(minus)
    }
    console.log(cnt)
  }

  const nums = [1,2,3,4]
  return (
    <div>
      <h2>Your Task</h2>
      <div>
      {
        tasks.map((n) => (
          <div>
            <input type="checkbox" />
            <span>{n}</span>
            <button>delete</button>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default TodoList
