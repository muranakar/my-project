/* eslint-disable */
<template>
  <div>
    <h1>Todo List</h1>
    <p>This is the content of the Todo List page.</p>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new todo" />
    <button @click="addTodo">Add</button>
    <ul>
      <transition-group name="fade" tag="ul">
        <li v-for="(todo, index) in activeTodos" :key="todo.id" @click="toggleTodo(todo)">
          <input type="checkbox" v-model="todo.completed" @change="updateTodo" />
          <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
          <button @click.stop="removeTodo(index)">Delete</button>
        </li>
      </transition-group>
    </ul>
    <h2>Archived Todos</h2>
    <ul>
      <transition-group name="fade" tag="ul">
        <li v-for="(todo, index) in archivedTodos" :key="todo.id">
          <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('todos')) || [],
      newTodo: ''
    };
  },
  computed: {
    activeTodos() {
      return this.todos.filter(todo => !todo.completed);
    },
    archivedTodos() {
      return this.todos.filter(todo => todo.completed);
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({ id: Date.now(), text: this.newTodo, completed: false });
        this.newTodo = '';
        localStorage.setItem('todos', JSON.stringify(this.todos));
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    updateTodo() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    toggleTodo(todo) {
      todo.completed = !todo.completed;
      this.updateTodo();
    }
  },
  watch: {
    todos: {
      handler(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
      },
      deep: true
    }
  }
}
</script>

<style scoped>
/* スタイルをここに追加 */
div {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}

h1, h2 {
  color: #2c3e50;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #ecf0f1;
  margin: 5px 0;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}

input[type="checkbox"] {
  margin-right: 10px;
  pointer-events: none;
}

.completed {
  text-decoration: line-through;
  color: #bdc3c7;
}

input {
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  margin-right: 10px;
}

button {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

li button {
  background-color: #e74c3c;
}

li button:hover {
  background-color: #c0392b;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>