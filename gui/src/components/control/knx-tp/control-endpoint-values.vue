<template>
  <v-dialog
    :width="800"
  >
    <v-btn slot="activator" small fab flat>
      <v-icon small color="info">fa-info</v-icon>
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
            <td>{{ endPoint.type }}</td>
            <td>{{ getAddress(endPoint.type) || ' -/-/-' }}</td>
            <td align="right">{{ getValue(endPoint.type) }}</td>
            <td>{{ getTimestamp(endPoint.type) }}</td>
            <td>
              <v-btn icon small>
                <v-icon small>fa-info</v-icon>
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
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        getByControlAndEndPoint: 'controlDataPoints/getByControlAndEndPoint',
        getDataPointById: 'dataPoints/getById',
      })
    },

    methods: {
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
      }
    },

    props: {
      control: {
        type: Object,
        required: true
      },
      endPoints: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>
  td, th {
    padding: 5px;
  }
</style>
