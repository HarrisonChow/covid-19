<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
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
              display: true
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
