<template>
  <footer class="footer">
    <span>© 2020 Harrison</span>
    <router-link :to="{ path: '/' }">News</router-link>
    <router-link :to="{ path: 'Search?q=Australia' }">Australia</router-link>
    <router-link :to="{ path: 'worldwide' }">Worldwide</router-link>
    <router-link :to="{ path: 'faqs' }">FAQs</router-link>
    <router-link :to="{ path: 'about' }">About</router-link>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">
  .footer {
    width: 100%;
    height: 50px;
    background: #333;
    opacity: 0.8;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0px;
    z-index: 0;
    margin-top: 40px;
  }
  span {
    margin-right: 40px;
  }
  a {
    margin-right: 25px;
    color: #ffffff;
  }
</style>
