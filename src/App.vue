<template>
  <div id="app">
    <nav v-if="showNav">
      <router-link to="/"><button @click="navigate">Home</button></router-link>
      <router-link to="/todo"><button @click="navigate">Todo List</button></router-link>
      <router-link to="/sample1"><button @click="navigate">Sample Page 1</button></router-link>
      <router-link to="/sample2"><button @click="navigate">Sample Page 2</button></router-link>
      <router-link to="/sample3"><button @click="navigate">Page 3</button></router-link>
      <router-link to="/sample4"><button @click="navigate">Page 4</button></router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      showNav: true
    };
  },
  methods: {
    navigate() {
      this.showNav = false;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  margin-bottom: 20px;
}
button {
  background-color: #2c3e50;
  border: 1px solid #2c3e50;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  padding: 10px 20px;
  font: inherit;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: white;
  color: #2c3e50;
}
nav a {
  margin-right: 10px;
  text-decoration: none;
}
</style>
