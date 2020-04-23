<template>
  <div class="faqs">
    <Header />
    <b-container>
      <h2>FAQs</h2>
        <div>
          <b-card no-body class="mb-1" v-for="faq in faqs" :key="faq.key">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#"  v-b-toggle="'accordion-' + faq.id">{{ faq.question }}</b-button>
            </b-card-header>
            <b-collapse :id="'accordion-'+faq.id" visible accordion="accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>{{ faq.answer }}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'Faqs',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      faqs: []
    }
  },
  mounted () {
    this.getFaqs()
  },
  methods: {
    getFaqs () {
      this.$axios({
        method: 'GET',
        url: 'https://covid19-news.herokuapp.com/api/covid19/faqs'
      })
        .then((response) => {
          var dataCollection = response.data.data
          var newData = []
          for (let i = 0; i < dataCollection.length; i++) {
            dataCollection[i].id = i
            newData.push(dataCollection[i])
          }
          this.faqs = newData
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  .btn-secondary {
      color: #000;
      background-color: #c3c3c3;
      border-color: #c3c3c3;
      text-align: left;
  }
  .btn-secondary:hover {
    color: #000;
    background-color: #e3e3e3;
    border-color: #e3e3e3;
  }
</style>
