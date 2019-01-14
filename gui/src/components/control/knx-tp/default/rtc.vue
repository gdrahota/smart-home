<template>
  <v-card>
    <control-header
      left-icon="fa-thermometer-half"
      :label="control.name"
      right-icon="fa-circle"
      :right-icon-color="getColor"
    />

    <v-card-text>
      <div class="pl-1 pr-1 pb-2 caption grey--text hidden-xs-only">
        <span v-if="updatedAt" class="float-left">{{ $moment(updatedAt).format('DD.MM.YY / HH:mm:ss') }}</span>
        <control-endpoint-values :control="control" :endPoints="endPoints" class="float-right"/>
      </div>
      <br/>
      <v-layout row wrap>
        <v-flex xs6>
          <v-text-field
            label="Ist"
            v-model="currentTemperature.value"
            readonly
            suffix="°C"
            type="number"
            class="pr-1"
            box
            disabled
          />
        </v-flex>
        <v-flex xs6>
          <v-text-field
            label="Soll"
            v-model="setTargetTemperature"
            suffix="°C"
            :min="15"
            :max="24"
            :step="0.5"
            type="number"
            class="pl-1"
            box
          />
        </v-flex>
      </v-layout>
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
      targetTemperature () {
        const valueObj = this.control.values['temp-target-value']

        if (valueObj !== null && valueObj !== undefined) {
          return valueObj
        }
        return {}
      },
      setTargetTemperature: {
        get () {
          return this.targetTemperature.value
        },
        set (value) {
          const command = {
            control: this.control._id,
            endPoint: 'temp-target-value',
            value
          }
          console.log(command)
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
