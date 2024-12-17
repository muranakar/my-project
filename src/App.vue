<template>
    <Sample1 />
</template>

<script>
import Sample1 from './components/Sample1.vue';

export default {
  name: 'App',
  components: {
    Sample1
  },
  data() {
    return {
      showNav: false
    };
  },
  methods: {
    navigate() {
      this.showNav = false;
    }
  },
  created() {
    this.$router.push('/sample1');
  }
}
</script>
