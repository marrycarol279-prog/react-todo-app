import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ tasks }) => {
  return (
    <div>
      <h2>Your Task</h2>
      {tasks.map((task,index) => (
        <TodoItem key={index} task={task}/>
      ))}
    </div>
  )
}

export default TodoList
