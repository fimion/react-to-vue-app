<script lang="jsx">
/** @jsx h */
import {ref, reactive, defineComponent, h} from "vue"


let todoCount = 0;
const newTodo = (item) => ({id:++todoCount, done:false, item });
const App = defineComponent({
  setup() {

    const todos = reactive([]);
    const showArchived = ref(false);
    const updateShowArchived = (value)=>showArchived.value=value;

    const addTodo = (item) => {
      const myTodo = newTodo(item);
      todos.push(myTodo);
    }

    const markDone = (todo)=>{
      todo.done = true;
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const formStuff = new FormData(e.target);

      addTodo(formStuff.get('item'));

      e.target.reset();

    }

    return {
      todos,
      showArchived,
      updateShowArchived,
      addTodo,
      markDone,
      handleSubmit,
    }
  }
});
export default App
</script>
<template>
  <div class="App">
    <header class="App-header">
      <h1>My Todo List</h1>
    </header>
    <form @submit="handleSubmit" class="add-item">
      <label for="item">New Todo</label>
      <input type="text" name="item" id="item" />
      <button>ADD!</button>
    </form>
    <label><input type="checkbox"
                  @change="updateShowArchived(!showArchived)"
                  :checked="showArchived">Show Finished</label>
    <ul>
      <li v-for="todo in todos.filter((e)=>e.done===showArchived)" :key="todo.id" >
      <button v-if="!showArchived" @click="markDone(todo)">
      <span aria-hidden="true">✔</span>
      <span class="sr-only">Mark Done</span>
    </button> {{todo.id}} - {{todo.item}}
    </li>
    </ul>
  </div>
</template>
<style scoped src="./App.css" />

