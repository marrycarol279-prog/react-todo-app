import React from 'react'

const TodoItem = ({ task }) => {
  return (
    <div>
      <input type='checkbox' />
      <span>{task}</span>
      <button>Delete</button>
    </div>
  )
}

export default TodoItem