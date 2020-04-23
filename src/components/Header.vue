<template>
  <div id="nav">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Covid-19</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ path: '/' }">News</b-nav-item>
          <b-nav-item :to="{ path: 'Search?q=Australia' }">Australia</b-nav-item>
          <b-nav-item :to="{ path: 'worldwide' }">Worldwide</b-nav-item>
          <b-nav-item :to="{ path: 'faqs' }">FAQs</b-nav-item>
          <b-nav-item :to="{ path: 'about' }">About</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
            <autocomplete :search="search" @submit="handleSubmit"></autocomplete>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'Header',
  data () {
    return {
      countries: []
    }
  },
  methods: {
    search (input) {
      if (input.length < 1) { return [] }
      return this.countries.filter(country => {
        return country.toLowerCase()
          .startsWith(input.toLowerCase())
      })
    },
    handleSubmit (result) {
      if (result !== undefined) {
        router.push({ path: 'Search', query: { q: result } })
      }
    },
    getCountries () {
      this.$axios({
        method: 'GET',
        url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php',
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
          'x-rapidapi-key': 'f7e8612a10msh40346434614a002p14b6a4jsn6bd1e615bc9b',
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          this.countries = response.data.affected_countries.slice(1, response.data.affected_countries.length - 1)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getCountries()
  }
}
</script>

<style scoped lang="scss">

</style>
