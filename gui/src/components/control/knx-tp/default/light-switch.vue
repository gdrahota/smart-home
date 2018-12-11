<template>
  <v-card>
    <v-card-title>
      <span>{{ control.name }}</span>
      <v-icon v-if="dataPoint" class="float-right" :color="getColor">fa-circle</v-icon>
    </v-card-title>
    <v-card-text>
      <v-switch
        v-if="dataPoint"
        color="orange"
        v-model="value"
        hide-details
        :label="value ? 'an' : 'aus'"
        ripple
      />
      <div v-else>
        <i>Dieses Control ist noch nicht angeschlossen!</i>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        commands: 'commandQueue/get',
        getControlDataPoint: 'controlDataPoints/getByControlAndEndPoint',
        getDataPoint: 'dataPoints/getById'
      }),
      controlDataPoint () {
        const controlDataPoint = this.getControlDataPoint(this.control._id, 'switch')
        if (controlDataPoint) {
          return controlDataPoint
        }
      },
      dataPoint () {
        if (this.controlDataPoint) {
          return this.getDataPoint(this.controlDataPoint.dataPoint)
        }
      },
      value: {
        get () {
          if (!this.dataPoint) {
            return false
          }
          if (this.dataPoint.value) {
            return this.dataPoint.value
          }
          return false
        },
        set (value) {
          const command = {
            control: this.control._id,
            endPoint: 'switch',
            value
          }
          this.sendCommand(command)
        }
      },
      getColor () {
        if (this.value === true) {
          return 'yellow'
        }
        return '#888'
      }
    },

    methods: {
      ...mapActions({
        sendCommand: 'commands/sendCommandAction'
      })
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
  table {
    border: 1px solid green;
  }

  .v-card {
    height: 130px;
  }

  .v-card__title {
    background-color: darkseagreen;
    padding-right: 5px;
    color: white;
    font-weight: 800;
    height: 40px;
  }

  .v-card__title > span {
    width: calc(100% - 25px);
  }

  .v-card__title > i {
    float: right;
  }
</style>
