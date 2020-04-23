<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  data () {
    return {
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  props: {
    chartData: Object
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
