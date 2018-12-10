<template>
  <!--<pre>{{control}}</pre>-->
  <v-card>
    <v-card-title>
      <div class="headline">Lichtschalter (An/Aus)</div>
    </v-card-title>
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
  </v-card>
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
            label: 'Gruppenadresse des Schaltbefehls',
            dataType: '1.001',
            endPoint: 'switch'
          },
          {
            label: 'Gruppenadresse, über welche die Bestätigung gesendet wird',
            dataType: '1.001',
            endPoint: 'response'
          },
          {
            label: 'Gruppenadresse, zum Dimmen',
            dataType: '5.001',
            endPoint: 'dim'
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
