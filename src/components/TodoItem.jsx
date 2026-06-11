import React from 'react'
import { useState } from 'react'

const TodoItem = ({ task }) => {
  const [Cnt,setCnt] = useState(0);
  function handleCheck(e){    
    if(e.target.checked){
      setCnt(Cnt+1);
    }
    console.log(Cnt)
  }

  return (
    <div>
      <input type='checkbox' onChange={(e) => handleCheck(e)} />
      <span>{task}</span>
      <button>Delete</button>
    </div>
  )
}

export default TodoItem