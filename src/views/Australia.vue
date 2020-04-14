<template slot="city" slot-scope="confirmed">
  <div class="australia">
    <Header />
    <CountryDetail v-if="infoloaded" :parentData="states" />
    <line-chart v-if="loaded" :chart-data="dataCollection"></line-chart>
  </div>
</template>

<script>
import Header from '@/components/Header'
import CountryDetail from '@/components/CountryDetail'
import LineChart from '@/components/LineChart'
import moment from 'moment'

export default {
  name: 'Australia',
  components: {
    Header,
    CountryDetail,
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
      dataCollection: {
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
    }
  },
  mounted () {
    this.getLatestStatByCountry()
    this.getHistoryByCountry()
  },
  methods: {
    getLatestStatByCountry () {
      this.$axios({
        method: 'GET',
        url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php',
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
          'x-rapidapi-key': 'f7e8612a10msh40346434614a002p14b6a4jsn6bd1e615bc9b'
        },
        params: {
          country: 'Australia'
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
    getHistoryByCountry () {
      this.$axios({
        method: 'GET',
        url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php',
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
          'x-rapidapi-key': 'f7e8612a10msh40346434614a002p14b6a4jsn6bd1e615bc9b'
        },
        params: {
          country: 'Australia'
        }
      })
        .then((response) => {
          var data = response.data.stat_by_country
          for (let i = 0; i < data.length; i++) {
            if ('total_cases' in data[i] || typeof data[i].total_cases !== 'undefined' || !data[i].total_cases) {
              if (this.lineChartTotalCase.indexOf(parseFloat(data[i].total_cases.replace(/,/g, ''))) < 0) {
                this.lineChartTotalCase.push(parseFloat(data[i].total_cases.replace(/,/g, '')))
                this.lineChartRecordDate.push(moment(data[i].record_date).format('DD-MM'))
                this.lineChartTotalDeaths.push(parseFloat(data[i].total_deaths.replace(/,/g, '')))
                this.lineChartActiveCases.push(parseFloat(data[i].active_cases.replace(/,/g, '')))
                this.lineChartRecovered.push(parseFloat(data[i].total_recovered.replace(/,/g, '')))
              }
            }
          }

          this.dataCollection.datasets[0].data = this.lineChartTotalDeaths
          this.dataCollection.datasets[1].data = this.lineChartRecovered
          this.dataCollection.datasets[2].data = this.lineChartActiveCases
          this.dataCollection.datasets[3].data = this.lineChartTotalCase
          this.dataCollection.labels = this.lineChartRecordDate

          this.loaded = true
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
