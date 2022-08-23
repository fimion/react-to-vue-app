import { useState } from 'react'
import './App.css'

let todoCount = 0;

function App() {

  
  

  const newTodo = (item) => ({id:++todoCount, done:false, item });

  const [todos, updateTodos] = useState([newTodo('Make todo list')]);
  
  const addTodo = (item) => {
    updateTodos([...todos, newTodo(item)]);
  }

  const markDone = (todo, index)=>{
    todo.done = true;
    todos[index] = { ...todo };
    updateTodos([...todos]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formStuff = new FormData(e.target);

    addTodo(formStuff.get('item'));

    e.target.reset();

  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Todo List</h1>
      </header>
      <form onSubmit={handleSubmit} className="add-item">
        <label htmlFor="item">New Todo</label>
        <input type="text" name="item" id="item" />
        <button>ADD!</button>
      </form>

      <ul>
        {todos.filter((e)=>!e.done).map((todo, index) => (<li key={todo.id}>
          <button onClick={()=>markDone(todo, index)}>
            <span aria-hidden="true">✔</span>
            <span className="sr-only">Mark Done</span>
          </button> {todo.item}
        </li>))}
      </ul>
    </div>
  )
}

export default App
