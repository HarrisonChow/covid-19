<template>
  <div class="news">
    <Header />
    <b-container class="content">
      <h2>News</h2>
      <b-row>
        <b-col md='6' lg='4' v-for="item in news" :key="item.id">
          <a :href="item.url" target="_blank">
            <div class="news-card card">
              <div class="wrapper" v-bind:style="{ backgroundImage: 'url(' + item.urlToImage + ')' } ">
                <div class="header">
                  <div class="date">
                    <span class="day">{{ item.publishedAt | moment("DD-MM-YYYY") }}</span>
                  </div>
                </div>
                <div class="data">
                  <div class="content">
                    <span class="author">{{ item.author }}</span>
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
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import moment from 'moment'
import Footer from '@/components/Footer'

export default {
  name: 'News',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      news: {},
      currentdate: moment(new Date()).format('YYYY-MM-DD'),
      yesterdayDate: moment((new Date()).setDate((new Date()).getDate() - 1)).format('YYYY-MM-DD')
    }
  },
  mounted () {
    this.getNews()
  },
  methods: {
    getNews (currentdate) {
      this.$axios({
        method: 'GET',
        url: 'https://newsapi.org/v2/everything?q=bitcoin&from=' + currentdate + '&sortBy=publishedAt&apiKey=cff97a7fecba42e0abc462e4a7e998a3'
      })
        .then((response) => {
          if (response.data.totalResults === 0) {
            this.getNews(this.yesterdayDate)
          } else {
            this.news = response.data.articles
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
  .content {
    margin-bottom: 40px;;
  }
  .card {
    float: left;
    width: 100%;
    margin-bottom: 25px;

    .wrapper {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: #fff;
      min-height: 320px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.2);

      &:hover .data {
        transform: translateY(0);
      }
    }

    .data {
      position: absolute;
      bottom: 0;
      width: 100%;
      transform: translateY(calc(70px + 1em));
      transition: transform 0.3s;

      .content {
        padding: 1em;
        position: relative;
        z-index: 1;
        background: rgba(0, 0, 0, 0.5);
      }
    }

    .author {
      font-size: 12px;
    }

    .title {
      margin-top: 10px;
    }

    .text {
      height: 70px;
      margin: 0;
    }

    input[type='checkbox'] {
      display: none;
    }
  }

  .news-card {
    .wrapper {
      opacity: 0.8;
      border-radius: 5px;
    }

    .header {
      color: #fff;
      padding: 1em;

      &::before {
        content: '';
        display: table;
      }

      &::after {
        content: '';
        display: table;
        clear: both;
      }

      .date {
        float: left;
        font-size: 12px;
      }
    }

    .data {
      color: #fff;
      transform: translateY(calc(70px + 4em));
    }

    .title a {
      color: #fff;
    }

    .button {
      display: block;
      width: 100px;
      margin: 2em auto 1em;
      text-align: center;
      font-size: 12px;
      color: #fff;
      line-height: 1;
      position: relative;
      font-weight: 700;

      &::after {
        content: '\2192';
        opacity: 0;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
        transition: all 0.3s;
      }

      &:hover::after {
        transform: translate(5px, -50%);
        opacity: 1;
      }
    }
  }
</style>
