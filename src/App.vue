<template>
  <div id="app" class="app-container">
    <h1>Simple blog app</h1>
  </div>
</template>

<script>

export default {
  name: "app",
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
