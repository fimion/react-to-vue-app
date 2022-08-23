import { useState } from 'react'
import {ref, reactive, defineComponent} from "vue"
import './App.css'


let todoCount = 0;
const newTodo = (item) => ({id:++todoCount, done:false, item });
const App = defineComponent(function() {

  const [todos, updateTodos] = useState([]);
  const [showArchived, updateShowArchived] = useState(false);
  const addTodo = (item) => {
    const myTodo = newTodo(item);
    console.log(myTodo)
    updateTodos([...todos, myTodo]);
  }

  const markDone = (todo)=>{
    todo.done = true;
    const index = todos.indexOf(todo);
    todos[index] = { ...todo };
    updateTodos([...todos]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formStuff = new FormData(e.target);

    addTodo(formStuff.get('item'));

    e.target.reset();

  }

  return ()=>(
    <div className="App">
      <header className="App-header">
        <h1>My Todo List</h1>
      </header>
      <form onSubmit={handleSubmit} className="add-item">
        <label htmlFor="item">New Todo</label>
        <input type="text" name="item" id="item" />
        <button>ADD!</button>
      </form>
      <label><input type={'checkbox'} onChange={()=>updateShowArchived(!showArchived)} checked={showArchived} />Show Finished</label>
      <ul>
        {todos.filter((e)=>e.done===showArchived).map((todo, index) => (<li key={todo.id}>
          {!showArchived && (<button onClick={()=>markDone(todo)}>
            <span aria-hidden="true">✔</span>
            <span className="sr-only">Mark Done</span>
          </button>)} {todo.id} - {todo.item}
        </li>))}
      </ul>
    </div>
  )
});

export default App
