<template>
  <v-card>
    <control-header
      left-icon="fa-thermometer-half"
      :left-icon-color="getColor"
      :label="control.name"
      :control="control"
    />
    <v-card-text>
      <div class="pl-1 pr-1 caption grey--text hidden-xs-only">
      <span v-if="updatedAt" class="float-right">{{ $moment(updatedAt).format('DD.MM.YY / HH:mm:ss') }}</span>
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
            hide-details
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
            hide-details
          />
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
  import moment from 'moment'
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
          this.sendCommand(command)
        }
      },
      updatedAt () {
        return this.currentTemperature.timestamp
      },
      getColor () {
        const absValueDateTime = this.control.values['switch-response']
        const relValueDateTime = this.control.values['pusher-response']

        let valueObj

        if (absValueDateTime && relValueDateTime) {
          valueObj = moment(relValueDateTime.timestamp).isAfter(absValueDateTime.timestamp) ? relValueDateTime : absValueDateTime
        } else {
          valueObj = relValueDateTime ? relValueDateTime : absValueDateTime
        }


        if (valueObj !== undefined && valueObj !== null) {
          if (valueObj.value === true || valueObj.value > 1) {
            return 'red'
          }
        }
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
  .v-card__text {
    padding-top: 6px;
  }
</style>
