<template>
  <v-card-text fifty>
    <knx-data-point
      v-for="controlEndPoint of controlDefinition.endPoints"
      :label="controlEndPoint.label"
      :dataType="controlEndPoint.dtp"
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
        dataPoints: 'dataPoints/get',
        getDefinitionByName: 'controls/getDefinitionByName',
      }),
      controlDefinition () {
        const controlDefinition = this.getDefinitionByName(this.control.controlType)
        if (controlDefinition) {
          return controlDefinition
        }
        return null
      }
    },

    data: function() {
      return {
        controlEndPoints: [
          {
            label: 'Gruppenadresse des Schaltbefehls',
            dataType: '1.001',
            endPoint: 'switch'
          }, {
            label: 'Gruppenadresse, über welche die Bestätigung gesendet wird',
            dataType: '1.001',
            endPoint: 'response'
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
