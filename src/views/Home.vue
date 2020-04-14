<template>
  <div class="home">
    <Header />
    <b-container>
      <h2>News</h2>
      <b-row>
        <b-col md='6' lg='4' v-for="item in news" :key="item.id">
          <a :href="item.link" target="_blank">
            <div class="news-card card">
              <div class="wrapper">
                <div class="header">
                  <div class="date">
                    <span class="day">{{ item.date }}</span>
                  </div>
                </div>
                <div class="data">
                  <div class="content">
                    <h4 class="title">{{ item.title }}</h4>
                    <a href="#" class="button">Read more</a>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'Home',
  components: {
    Header
  },
  data () {
    return {
      news: {}
    }
  },
  mounted () {
    this.getNews()
  },
  methods: {
    getNews () {
      this.$axios({
        method: 'GET',
        url: 'http://covid19-news.herokuapp.com/api/covid19/news'
      })
        .then((response) => {
          console.log(response)
          this.news = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700);
 * {
    box-sizing: border-box;
  }
  .card {
    float: left;
    width: 100%;
    margin-bottom: 25px;
  }
  .card .menu-content {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  .card .menu-content::before, .card .menu-content::after {
    content: '';
    display: table;
  }
  .card .menu-content::after {
    clear: both;
  }
  .card .menu-content li {
    display: inline-block;
  }
  .card .menu-content a {
    color: #fff;
  }
  .card .menu-content span {
    position: absolute;
    left: 50%;
    top: 0;
    font-size: 10px;
    font-weight: 700;
    font-family: 'Open Sans';
    transform: translate(-50%, 0);
  }
  .card .wrapper {
    background-color: #fff;
    min-height: 320px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.2);
  }
  .card .wrapper:hover .data {
    transform: translateY(0);
  }
  .card .data {
    position: absolute;
    bottom: 0;
    width: 100%;
    transform: translateY(calc(70px + 1em));
    transition: transform 0.3s;
  }
  .card .data .content {
    padding: 1em;
    position: relative;
    z-index: 1;
  }
  .card .author {
    font-size: 12px;
  }
  .card .title {
    margin-top: 10px;
  }
  .card .text {
    height: 70px;
    margin: 0;
  }
  .card input[type='checkbox'] {
    display: none;
  }
  .card input[type='checkbox']:checked + .menu-content {
    transform: translateY(-60px);
  }
  .news-card .wrapper {
    background: url(https://edge.alluremedia.com.au/m/l/2020/03/johnhopkins.jpg) center / cover no-repeat;
    opacity: 0.8;
    border-radius: 5px;
  }
  .news-card .wrapper:hover .menu-content span {
    transform: translate(-50%, -10px);
    opacity: 1;
  }
  .news-card .header {
    color: #fff;
    padding: 1em;
  }
  .news-card .header::before, .news-card .header::after {
    content: '';
    display: table;
  }
  .news-card .header::after {
    clear: both;
  }
  .news-card .header .date {
    float: left;
    font-size: 12px;
  }
  .news-card .menu-content {
    float: right;
  }
  .news-card .menu-content li {
    margin: 0 5px;
    position: relative;
  }
  .news-card .menu-content span {
    transition: all 0.3s;
    opacity: 0;
  }
  .news-card .data {
    color: #fff;
    transform: translateY(calc(70px + 4em));
  }
  .news-card .title a {
    color: #fff;
  }
  .news-card .button {
    display: block;
    width: 100px;
    margin: 2em auto 1em;
    text-align: center;
    font-size: 12px;
    color: #fff;
    line-height: 1;
    position: relative;
    font-weight: 700;
  }
  .news-card .button::after {
    content: '\2192';
    opacity: 0;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    transition: all 0.3s;
  }
  .news-card .button:hover::after {
    transform: translate(5px, -50%);
    opacity: 1;
  }
</style>
