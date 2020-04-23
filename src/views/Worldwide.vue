<template slot="city" slot-scope="confirmed">
  <div class="worldwide">
    <Header />
    <h3>TOP 10 Countries</h3>
    <bar-chart class="bars" v-if="loaded" :chart-data="dataCollection"></bar-chart>
    <b-table striped hover :items="states" @row-clicked="rowClickHandler"></b-table>
    <b-container>
      <div class="loadMore" id="loadMore">
        <b-button squared variant="info"  v-on:click="lazyLoad">Load More</b-button>
      </div>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '@/components/Footer'
import BarChart from '@/components/BarChart'
import router from '../router'

export default {
  name: 'Worldwide',
  components: {
    Header,
    Footer,
    BarChart
  },
  data () {
    return {
      states: [],
      allData: [],
      page: 1,
      pagesize: 5,
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
          'x-rapidapi-key': 'f7e8612a10msh40346434614a002p14b6a4jsn6bd1e615bc9b',
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          console.log(response, 'b')
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

          this.allData = response.data.countries_stat.splice(1, response.data.countries_stat.length - 1)
          this.states = this.allData.splice(0, this.pagesize)
          this.loaded = true
        })
        .catch((error) => {
          console.log(error)
        })
    },
    lazyLoad () {
      var fromNo = this.page * 10
      var toNo = this.page * 10 + this.pagesize - 1 < this.allData.length ? this.page * 10 + this.pagesize - 1 : this.allData.length - 1
      var loadData = this.allData.slice(fromNo, toNo)
      this.states = this.states.concat(loadData)
      this.page += 1
      if (toNo === this.allData.length - 1) {
        var elem = document.getElementById('loadMore')
        elem.parentNode.removeChild(elem)
        return false
      }
    },
    rowClickHandler (record, index) {
      router.push({ path: 'Search', query: { q: record.country_name } })
    }
  }
}
</script>

<style scoped lang="scss">
  h3 {
    text-align: center;
  }
  tbody tr:hover {
    cursor: poiter;
  }
  .bars {
    margin-top: 50px;
    margin-bottom: 60px;
    text-align: center;
  }
  .loadMore {
    text-align: center;
    padding-top: 25px;
    margin-bottom: 40px;
    .btn-info{
      width: 280px;
    }
  }
</style>
