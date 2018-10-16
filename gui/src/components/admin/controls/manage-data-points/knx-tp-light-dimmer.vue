<template>
  <div>light Dimmer</div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        dataPoints: 'dataPoints/get'
      })
    }
  }
</script>
