import {ref, reactive, defineComponent, h} from "vue"
import './App.css'
/** @jsx h */

let todoCount = 0;
const newTodo = (item) => ({id:++todoCount, done:false, item });
const App = defineComponent(function() {

  //const [todos, updateTodos] = useState([]);
  //const [showArchived, updateShowArchived] = useState(false);
  const todos = ref([]);
  const updateTodos = (value)=>todos.value = value;
  const showArchived = ref(false);
  const updateShowArchived = (value)=>showArchived.value=value;

  const addTodo = (item) => {
    const myTodo = newTodo(item);
    console.log(myTodo)
    updateTodos([...todos.value, myTodo]);
  }

  const markDone = (todo)=>{
    todo.done = true;
    const index = todos.value.indexOf(todo);
    todos.value[index] = { ...todo };
    updateTodos([...todos.value]);
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
      <label><input type={'checkbox'} onChange={()=>updateShowArchived(!showArchived.value)} checked={showArchived.value} />Show Finished</label>
      <ul>
        {todos.value.filter((e)=>e.done===showArchived.value).map((todo, index) => (<li key={todo.id}>
          {!showArchived.value && (<button onClick={()=>markDone(todo)}>
            <span aria-hidden="true">✔</span>
            <span className="sr-only">Mark Done</span>
          </button>)} {todo.id} - {todo.item}
        </li>))}
      </ul>
    </div>
  )
});

export default App
