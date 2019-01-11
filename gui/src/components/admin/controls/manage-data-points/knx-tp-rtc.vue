<template>
  <v-card-text fifty>
    <knx-data-point
      v-for="controlEndPoint of controlEndPoints"
      :label="controlEndPoint.label"
      :dataType="controlEndPoint.dataType"
      :endPoint="controlEndPoint.endPoint"
      :control="control"
      :key="control._id + controlEndPoint.endPoint"
    />
  </v-card-text>
</template>

<script>
  import { mapGetters } from 'vuex'
  import KnxDataPoint from './knx-tp-data-point'

  export default {
    components: {
      KnxDataPoint
    },

    computed: {
      ...mapGetters({
        dataPoints: 'dataPoints/get'
      })
    },

    data: function() {
      return {
        controlEndPoints: [
          {
            label: 'Gruppenadresse, Heizzustand (Ein/Aus)',
            dataType: '1.001',
            endPoint: 'switch-response'
          },
          {
            label: 'Gruppenadresse, Heizzustand (in %)',
            dataType: '5.001',
            endPoint: 'pusher-response'
          },
          {
            label: 'Gruppenadresse, Temperatur Sollwert',
            dataType: '9.001',
            endPoint: 'temp-target-value'
          },
          {
            label: 'Gruppenadresse, Temperatur Istwert',
            dataType: '9.001',
            endPoint: 'temp-current-value'
          }
        ]
      }
    },

    props: {
      control: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
  [fifty] {
    max-width: 800px;
  }
</style>
