<template>
    <router-view />
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      showNav: false
    };
  },
  methods: {
    navigate() {
      this.showNav = false;
    }
  }
}
</script>
