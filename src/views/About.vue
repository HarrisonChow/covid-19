<template>
  <div class="about">
    <Header />
    <b-container>
      <b-card
        title="Harrison"
        img-src="https://www.themarketingsage.com/wp-content/uploads/2015/08/about-me-leon-severan-we-buy-houses.jpg"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 30rem;"
        class="mb-2"
      >
        <b-card-text>
          What did you want me to say?
          <p>People can become developers from almost any background, whether they started programming at an early age and majored in computer science (CS), or they taught themselves how to code later in life.</p>
          <p>If you are a gifted computer wizard from age 7, there’s no doubt you’ll become a great software engineer. But if this is not the case, why should you be one of those people spending all day typing at a keyboard making the machine do what you want?</p>
          <h4>8 good reasons to become a software developer</h4>
          <p>You will learn every day</p>
          <p>It’s a profession in high demand</p>
          <p>Being able to work remotely</p>
          <p>Good pay and economic benefits</p>
          <p>You have the option to go indie</p>
          <p>It’s a creative outlet</p>
          <p>Coding is social</p>
          <p>It’s up to you</p>
        </b-card-text>
      </b-card>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'about',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped lang="scss">
  .card {
    margin: auto;
    border: 0;
  }
</style>
