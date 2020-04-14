<template>
  <div class="about">
    <Header />
    <b-container>
      <b-card
        title="Harrison Zhou"
        img-src="https://www.themarketingsage.com/wp-content/uploads/2015/08/about-me-leon-severan-we-buy-houses.jpg"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 40rem;"
        class="mb-2"
      >
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>

      </b-card>
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'about',
  components: {
    Header
  }
}
</script>

<style scoped lang="scss">
  .card {
    margin: auto;
    border: 0;
  }
</style>
