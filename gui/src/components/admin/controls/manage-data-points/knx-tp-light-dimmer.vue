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
            label: 'Schaltbefehls An / Aus',
            dataType: '1.001',
            endPoint: 'switch'
          },
          {
            label: 'Dimmen',
            dataType: '5.001',
            endPoint: 'dim'
          },
          {
            label: 'Dimmen, Bestätigung',
            dataType: '5.001',
            endPoint: 'dim-response'
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
