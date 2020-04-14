<template slot="city" slot-scope="confirmed">
  <div class="worldwide">
    <Header />
    <h3>TOP 10 Countries</h3>
    <bar-chart class="bars" v-if="loaded" :chart-data="dataCollection"></bar-chart>
    <b-table striped hover :items="states"></b-table>
  </div>
</template>

<script>
import Header from '../components/Header'
import BarChart from '@/components/BarChart'

export default {
  name: 'Worldwide',
  components: {
    Header,
    BarChart
  },
  data () {
    return {
      states: [],
      loaded: false,
      barChartActiveCases: [],
      barChartCases: [],
      barChartDeaths: [],
      barChartSeriousCritucal: [],
      barChartRecovered: [],
      barChartcountrylabel: [],
      dataCollection: {
        labels: [],
        datasets: [
          {
            label: 'Total cases',
            backgroundColor: '#3e95cd',
            data: []
          },
          {
            label: 'Deaths',
            backgroundColor: '#8e5ea2',
            data: []
          },
          {
            label: 'Recovered',
            backgroundColor: '#3cba9f',
            data: []
          }
        ]
      }
    }
  },
  mounted () {
    this.getCasesByCountry()
  },
  methods: {
    getCasesByCountry () {
      this.$axios({
        method: 'GET',
        url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php',
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
          'x-rapidapi-key': 'f7e8612a10msh40346434614a002p14b6a4jsn6bd1e615bc9b'
        }
      })
        .then((response) => {
          var data = response.data.countries_stat.slice(1, 10)
          for (let i = 0; i < data.length; i++) {
            if ('active_cases' in data[i] || typeof data[i].active_cases !== 'undefined' || !data[i].active_cases) {
              this.barChartActiveCases.push(parseFloat(data[i].active_cases.replace(/,/g, '')))
              this.barChartCases.push(parseFloat(data[i].cases.replace(/,/g, '')))
              this.barChartDeaths.push(parseFloat(data[i].deaths.replace(/,/g, '')))
              this.barChartSeriousCritucal.push(parseFloat(data[i].serious_critical.replace(/,/g, '')))
              this.barChartRecovered.push(parseFloat(data[i].total_recovered.replace(/,/g, '')))
              this.barChartcountrylabel.push(data[i].country_name)
            }
          }

          this.dataCollection.datasets[0].data = this.barChartCases
          this.dataCollection.datasets[1].data = this.barChartDeaths
          this.dataCollection.datasets[2].data = this.barChartRecovered

          this.dataCollection.labels = this.barChartcountrylabel

          this.states = response.data.countries_stat.splice(1, response.data.countries_stat.length - 1)
          this.loaded = true
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
  h3 {
    text-align: center;
  }
  .bars {
    margin-top: 50px;
    margin-bottom: 60px;
    text-align: center;
  }
</style>
