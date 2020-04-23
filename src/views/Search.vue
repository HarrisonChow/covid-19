<template slot="city" slot-scope="confirmed">
  <div class="search">
    <Header />
    <CountryDetail v-if="infoloaded" :parentData="states" />
    <b-container>
      <h3>Daily overview of cases</h3>
    </b-container>
    <bar-chart class="bars" v-if="loaded" :chart-data="barchatDataCollection"></bar-chart>
    <br>
    <b-container>
      <h3>Current situaton</h3>
    </b-container>
    <line-chart v-if="loaded" :chart-data="linechartDataCollection"></line-chart>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CountryDetail from '@/components/CountryDetail'
import LineChart from '@/components/LineChart'
import BarChart from '@/components/BarChart'
import moment from 'moment'

export default {
  name: 'Search',
  components: {
    Header,
    Footer,
    CountryDetail,
    BarChart,
    LineChart
  },
  data () {
    return {
      states: [],
      loaded: false,
      infoloaded: false,
      lineChartTotalCase: [],
      lineChartRecordDate: [],
      lineChartTotalDeaths: [],
      lineChartRecovered: [],
      lineChartActiveCases: [],
      linechartDataCollection: {
        labels: [],
        datasets: [
          {
            label: 'Total deaths',
            backgroundColor: '#3cba9f',
            borderWidth: 1,
            pointBorderColor: '#3cba9f',
            pointRadius: 1,
            data: []
          },
          {
            label: 'Total recovered',
            backgroundColor: '#8e5ea2',
            borderWidth: 1,
            borderColor: '#8e5ea2',
            pointRadius: 1,
            data: []
          },
          {
            label: 'Active cases',
            backgroundColor: '#3e95cd',
            borderWidth: 1,
            borderColor: '#3e95cd',
            pointRadius: 1,
            data: []
          },
          {
            label: 'Total cases',
            backgroundColor: '#e8c3b9',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            pointRadius: 1,
            data: []
          }
        ]
      },
      barChartDailyCases: [],
      barchatDataCollection: {
        labels: [],
        datasets: [
          {
            label: 'Daily increase cases',
            backgroundColor: '#ea7369',
            data: []
          }
        ]
      }
    }
  },
  watch: {
    '$route.query.q' () {
      this.loaded = false
      this.states = []
      this.loaded = false
      this.infoloaded = false
      this.lineChartTotalCase = []
      this.lineChartRecordDate = []
      this.lineChartTotalDeaths = []
      this.lineChartRecovered = []
      this.lineChartActiveCases = []
      this.linechartDataCollection = {
        labels: [],
        datasets: [
          {
            label: 'Total deaths',
            backgroundColor: '#3cba9f',
            borderWidth: 1,
            pointBorderColor: '#3cba9f',
            pointRadius: 1,
            data: []
          },
          {
            label: 'Total recovered',
            backgroundColor: '#8e5ea2',
            borderWidth: 1,
            borderColor: '#8e5ea2',
            pointRadius: 1,
            data: []
          },
          {
            label: 'Active cases',
            backgroundColor: '#3e95cd',
            borderWidth: 1,
            borderColor: '#3e95cd',
            pointRadius: 1,
            data: []
          },
          {
            label: 'Total cases',
            backgroundColor: '#e8c3b9',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            pointRadius: 1,
            data: []
          }
        ]
      }
      this.barChartDailyCases = []
      this.barchatDataCollection = {
        labels: [],
        datasets: [
          {
            label: 'Daily increase cases',
            backgroundColor: '#ea7369',
            data: []
          }
        ]
      }
      var country = this.$route.query.q
      this.getLatestStatByCountry(country)
      this.getHistoryByCountry(country)
    }
  },
  mounted () {
    var country = this.$route.query.q
    this.getLatestStatByCountry(country)
    this.getHistoryByCountry(country)
  },
  methods: {
    getLatestStatByCountry (queryCountry) {
      this.$axios({
        method: 'GET',
        url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php',
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
          'x-rapidapi-key': 'f7e8612a10msh40346434614a002p14b6a4jsn6bd1e615bc9b',
          'Access-Control-Allow-Origin': '*'
        },
        params: {
          country: queryCountry
        }
      })
        .then((response) => {
          if (response.data.latest_stat_by_country[0] !== 'undefined' || !response.data.latest_stat_by_country[0]) {
            this.states = response.data.latest_stat_by_country
          }
          this.infoloaded = true
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getHistoryByCountry (queryCountry) {
      this.$axios({
        method: 'GET',
        url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php',
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
          'x-rapidapi-key': 'f7e8612a10msh40346434614a002p14b6a4jsn6bd1e615bc9b',
          'Access-Control-Allow-Origin': '*'
        },
        params: {
          country: queryCountry
        }
      })
        .then((response) => {
          var data = response.data.stat_by_country
          for (let i = 0; i < data.length; i++) {
            if ('total_cases' in data[i] || typeof data[i].total_cases !== 'undefined' || !data[i].total_cases) {
              if (this.lineChartTotalCase.indexOf(parseFloat(data[i].total_cases.replace(/,/g, ''))) < 0) {
                if (this.lineChartRecordDate.indexOf(moment(data[i].record_date).format('DD-MM')) < 0) {
                  this.lineChartTotalCase.push(parseFloat(data[i].total_cases.replace(/,/g, '')))
                  this.lineChartRecordDate.push(moment(data[i].record_date).format('DD-MM'))
                  this.lineChartTotalDeaths.push(parseFloat(data[i].total_deaths.replace(/,/g, '')))
                  this.lineChartActiveCases.push(parseFloat(data[i].active_cases.replace(/,/g, '')))
                  this.lineChartRecovered.push(parseFloat(data[i].total_recovered.replace(/,/g, '')))
                  this.barChartDailyCases.push(parseFloat(data[i].new_cases.replace(/,/g, '')))
                } else {
                  this.lineChartTotalCase.pop()
                  this.lineChartActiveCases.pop()
                  this.lineChartRecovered.pop()
                  this.barChartDailyCases.pop()
                  this.lineChartTotalCase.push(parseFloat(data[i].total_cases.replace(/,/g, '')))
                  this.lineChartActiveCases.push(parseFloat(data[i].active_cases.replace(/,/g, '')))
                  this.lineChartRecovered.push(parseFloat(data[i].total_recovered.replace(/,/g, '')))
                  this.barChartDailyCases.push(parseFloat(data[i].new_cases.replace(/,/g, '')))
                }
              }
            }
          }
          this.linechartDataCollection.datasets[0].data = this.lineChartTotalDeaths
          this.linechartDataCollection.datasets[1].data = this.lineChartRecovered
          this.linechartDataCollection.datasets[2].data = this.lineChartActiveCases
          this.linechartDataCollection.datasets[3].data = this.lineChartTotalCase
          this.linechartDataCollection.labels = this.lineChartRecordDate
          this.barchatDataCollection.datasets[0].data = this.barChartDailyCases
          this.barchatDataCollection.labels = this.lineChartRecordDate
          this.loaded = true
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
