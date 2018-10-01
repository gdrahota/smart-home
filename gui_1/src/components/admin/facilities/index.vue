<template>
  <ul>
    <li v-for="facility of facilities" :key="facility._id">
      <location-address :address="facility.address"/>
    </li>
  </ul>
</template>

<script>
  import { mapGetters } from 'vuex'
  import LocationAddress from './address'

  export default {
    components: {
      LocationAddress
    },

    computed: {
      ...mapGetters({
        facilities: 'facilities/get'
      })
    }
  }
</script>
