<template>
  <div class="details">
    <h3>{{parentData[0].country_name}}</h3>
    <b-container>
      <b-row>
        <b-col cols='12' md='3' sm='6'>
          <h6>Total cases</h6>
          <p v-if="parentData[0].total_cases !== ''"> {{parentData[0].total_cases}}</p>
          <p v-else class="zero"> 0 </p>
        </b-col>
        <b-col cols='12' md='3' sm='6'>
          <h6>New cases</h6>
          <p v-if="parentData[0].new_cases !== ''"> {{parentData[0].new_cases}}</p>
          <p v-else class="zero"> 0 </p>
        </b-col>
        <b-col cols='12' md='3' sm='6'>
          <h6>Active cases</h6>
          <p v-if="parentData[0].active_cases !== ''"> {{parentData[0].active_cases}}</p>
          <p v-else class="zero"> 0 </p>
        </b-col>
        <b-col cols='12' md='3' sm='6'>
          <h6>Total deaths</h6>
          <p v-if="parentData[0].total_deaths !== ''" class="death"> {{parentData[0].total_deaths}}</p>
          <p v-else class="zero"> 0 </p>
        </b-col>
        <b-col cols='12' md='3' sm='6'>
          <h6>New deaths</h6>
          <p v-if="parentData[0].new_deaths !== ''" class="death"> {{parentData[0].new_deaths}}</p>
          <p v-else class="zero"> 0 </p>
        </b-col>
        <b-col cols='12' md='3' sm='6'>
          <h6>Total recovered</h6>
          <p  v-if="parentData[0].total_recovered !== ''" class="recoverd"> {{parentData[0].total_recovered}}</p>
          <p v-else class="zero"> 0 </p>
        </b-col>
        <b-col cols='12' md='3' sm='6'>
          <h6>Cases per 1M</h6>
          <p v-if="parentData[0].total_cases_per1m !== ''"> {{parentData[0].total_cases_per1m}}</p>
          <p v-else class="zero"> 0 </p>
        </b-col>
        <b-col cols='12' md='3' sm='6'>
          <h6>Record update date</h6>
          <p> {{parentData[0].record_date | moment("DD-MM-YYYY")}}</p>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
export default {
  name: 'CountryDetail',
  props: {
    parentData: Array
  }
}
</script>

<style scoped lang="scss">
  .details {
    margin-top: 50px;
    margin-bottom: 60px;
    text-align: center;
    .death {
      color: red;
    }
    .recoverd, .zero {
      color: #008800;
    }
  }
</style>
