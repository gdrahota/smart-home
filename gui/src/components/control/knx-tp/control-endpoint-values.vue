<template>
  <v-dialog :width="800">
    <v-btn slot="activator" icon small outline color="grey lighten-1">
      <v-icon small color="grey">fa-info</v-icon>
    </v-btn>
    <v-card>
      <v-card-text>
        <table class="table full-width">
          <thead>
          <tr>
            <th align="left">Bezeichnung</th>
            <th align="left">Kommando</th>
            <th align="left">Adresse</th>
            <th align="right">Wert</th>
            <th align="left">Zeitstempel</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(endPoint, idx) of endPoints" :key="'row' + idx">
            <td>{{ endPoint.label }}</td>
            <td>{{ endPoint.endPoint }}</td>
            <td>{{ getAddress(endPoint.endPoint) || ' -/-/-' }}</td>
            <td align="right">{{ getValue(endPoint.endPoint) }}</td>
            <td>{{ getTimestamp(endPoint.endPoint) }}</td>
            <td>
              <v-btn
                v-if="getAddress(endPoint.endPoint)"
                @click="requestValue(endPoint.endPoint)"
                icon
                small
              >
                <v-icon small color="info">fa-refresh</v-icon>
              </v-btn>
            </td>
          </tr>
          </tbody>
        </table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        getByControlAndEndPoint: 'controlDataPoints/getByControlAndEndPoint',
        getDataPointById: 'dataPoints/getById',
        getControlDefinition: 'controls/getDefinitionByName',
      }),
      controlDefinition () {
        return this.getControlDefinition(this.control.controlType)
      },
      endPoints () {
        if (this.controlDefinition) {
          return this.controlDefinition.endPoints
        }
      },
    },

    methods: {
      ...mapActions({
        sendCommand: 'commands/sendCommandAction'
      }),
      getDataPoint (type) {
        const controlDataPoint = this.getByControlAndEndPoint(this.control._id, type)
        if (controlDataPoint) {
          const dataPoint = this.getDataPointById(controlDataPoint.dataPoint)
          if (dataPoint) {
            return dataPoint
          }
        }
        return {}
      },
      getAddress (type) {
        return this.getDataPoint(type).address
      },
      getValue (type) {
        const values = this.control.values[type]
        if (values !== undefined && values !== null) {
          return values.value
        }
      },
      getTimestamp (type) {
        const values = this.control.values[type]
        if (values !== undefined && values !== null) {
          return this.$moment(values.timestamp).format('DD.MM.YY / HH:mm:ss')
        }
      },
      requestValue (type) {
        const command = {
          commandType: 'readValue',
          control: this.control._id,
          endPoint: type
        }
        this.sendCommand(command)
      }
    },

    props: {
      control: {
        type: Object,
        required: true
      },
    }
  }
</script>

<style scoped>
  td, th {
    padding: 5px;
  }
</style>
