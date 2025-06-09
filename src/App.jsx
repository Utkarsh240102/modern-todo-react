import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [newItem, setNewItem] = useState("")
  
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("Items")
    if (localValue == null) { return [] }
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("Items", JSON.stringify(todos))
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()
    if (newItem.trim() === "") return

    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false }
      ]
    })
    setNewItem("")
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <div className="app-container">
      <h1 className="app-title">✨ Todo List</h1>
      
      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className="form-row">
          <label htmlFor="item">New Task</label>
          <input 
            value={newItem} 
            onChange={e => setNewItem(e.target.value)} 
            type="text" 
            id="item"
            placeholder='What needs to be done?' 
          />
        </div>
        <button className='btn'>Add Task</button>
      </form>
      
      <h2 className='header'>Your Tasks</h2>
      
      <ul className='list'>
        {todos.length === 0 ? (
          <div className="empty-state">
            No tasks yet! Add one above to get started.
          </div>
        ) : (
          todos.map(todo => {
            return (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={todo.completed} 
                    onChange={e => toggleTodo(todo.id, e.target.checked)} 
                  />
                  {todo.title}
                </label>
                <button onClick={() => deleteTodo(todo.id)} className='btn btn-danger'>
                  Delete
                </button>
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}

export default App
