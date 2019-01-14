<template>
  <v-card>
    <control-header
      left-icon="fa-thermometer-half"
      :label="control.name"
      right-icon="fa-circle"
      :right-icon-color="getColor"
    />
    <v-card-text>
      <v-chip label class="mt-2">Ist: {{ currentTemperature.value | number(1) }} °C / Soll: {{ targetTemperature.value | number(1)
        }} °C
      </v-chip>
      <div class="mt-3 caption grey--text hidden-xs-only">
        <span class="float-left control-values">
          <control-endpoint-values :control="control" :endPoints="endPoints"/>
        </span>
        <span class="float-right" v-if="updatedAt">{{ $moment(updatedAt).format('DD.MM.YY / HH:mm:ss') }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapActions } from 'vuex'
  import ControlHeader from '../control-header'
  import ControlEndpointValues from '../control-endpoint-values'

  export default {
    components: {
      ControlHeader,
      ControlEndpointValues,
    },

    computed: {
      currentTemperature: {
        get () {
          const valueObj = this.control.values['temp-current-value']

          if (valueObj !== null && valueObj !== undefined) {
            return valueObj
          }
          return {}
        },
        set () {}
      },
      targetTemperature: {
        get () {
          const valueObj = this.control.values['temp-target-value']

          if (valueObj !== null && valueObj !== undefined) {
            return valueObj
          }
          return {}
        },
        set (value) {
          const command = {
            control: this.control._id,
            endPoint: 'temp-target-value',
            value
          }
          this.sendCommand(command)
        }
      },
      updatedAt () {
        return this.currentTemperature.timestamp
      },
      getColor () {
        const valueObj = this.control.values['switch-response']
          ? this.control.values['switch-response']
          : this.control.values['pusher-response']

        if (valueObj !== undefined && valueObj !== null) {
          if (valueObj.value === true || valueObj.value > 0) {
            return 'orange'
          }
        }
      }
    },

    data () {
      return {
        endPoints: [
          { type: 'temp-current-value', label: 'Ist-Temperatur' },
          { type: 'temp-target-value', label: 'Soll-Temperatur' },
          { type: 'switch-response', label: 'Bestätigung (Ein/Aus)' },
          { type: 'pusher-response', label: 'Bestätigung (0..100 %)' }
        ]
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
  .v-card {
    height: 140px;
  }

  .control-values {
    position: absolute;
    top: 100px;
    left: 0px;
  }
</style>
