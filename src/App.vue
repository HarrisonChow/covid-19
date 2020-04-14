<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 0 0 30px 0;

  a {
    font-weight: bold;
    color: #fff;

    &.router-link-exact-active {
      color: #fed8b1;
    }
  }
}
</style>
