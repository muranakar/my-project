<template>
  <div class="todo-app">
    <h1>{{ msg }}</h1>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new todo" />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span :class="{ done: todo.done }" @click="toggleTodo(todo)">{{ todo.text }}</span>
        <button @click="removeTodo(todo)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoApp',
  props: {
    msg: String
  },
  data() {
    return {
      newTodo: '',
      todos: [
        { id: 1, text: 'Learn Vue.js', done: false },
        { id: 2, text: 'Build a todo list', done: false },
        { id: 3, text: 'Master Vue components', done: false }
      ]
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({ id: Date.now(), text: this.newTodo, done: false });
        this.newTodo = '';
      }
    },
    toggleTodo(todo) {
      todo.done = !todo.done;
    },
    removeTodo(todo) {
      this.todos = this.todos.filter(t => t.id !== todo.id);
    }
  }
}
</script>

<style scoped>
.todo-app {
  max-width: 600px;
  margin: 0 auto;
}
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
li .done {
  text-decoration: line-through;
}
button {
  background: none;
  border: none;
  color: #ff0000;
  cursor: pointer;
}
</style>
