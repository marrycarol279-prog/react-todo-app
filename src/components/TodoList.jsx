import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ tasks }) => {
  return (
    <div>
      <h3>Your Task</h3>
      {tasks.map((task,index) => (
        <TodoItem key={index} task={task}/>
      ))}
    </div>
  )
}

export default TodoList
