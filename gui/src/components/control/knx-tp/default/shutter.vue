<template>
  <v-card>
    <control-header
      left-icon="fa-bars"
      :label="control.name"
      right-icon="fa-circle"
      :right-icon-color="getColor"
    />
    <v-card-text>
      <v-slider
        inverse-label
        v-model="setValue"
        step="10"
        :label="setValue + ' %'"
        :color="isWindowOpen ? 'red' : 'grey'"
        hide-details
      />
      <span id="important-message" v-if="isWindowOpen">Fenster ist geöffnet</span>
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
      getCurrentValueObj () {
        const valueObj = this.control.values['shutter-position-response']
          ? this.control.values['shutter-position-response']
          : this.control.values['shutter-position-set']

        if (valueObj !== null && valueObj !== undefined) {
          return valueObj
        }
        return { value: 0 }
      },
      setValue: {
        get () {
          return Math.round(this.getCurrentValueObj.value)
        },
        set (value) {
          const command = {
            control: this.control._id,
            endPoint: 'shutter-position-set',
            value
          }
          this.sendCommand(command)
        }
      },
      getColor () {
        if (this.getCurrentValueObj.value && this.getCurrentValueObj.value > 0) {
          return 'yellow'
        }
        return '#888'
      },
      updatedAt () {
        if (this.getCurrentValueObj) {
          return this.getCurrentValueObj.timestamp
        }
      },
      isWindowOpen () {
        return this.control.values && this.control.values.windowState
      }
    },

    data () {
      return {
        endPoints: [
          { type: 'shutter-position-set', label: 'Fahrbefehl' },
          { type: 'shutter-position-response', label: 'Bestätigung' }
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

  #important-message {
    position: absolute;
    top: 50px;
  }

  .control-values {
    position: absolute;
    top: 100px;
    left: 0px;
  }
</style>
