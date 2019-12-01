<template>
  <div id="app" class="app-container">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import headerBlogs from './components/headerBlogs.vue';

export default {
  name: "app",
  components: {
    'app-header': headerBlogs,
  },
  data() {
    return {
    }
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}


@media only screen and (max-width: 640px) {
  body {
    font-size: 12px;
  }
}
</style>
