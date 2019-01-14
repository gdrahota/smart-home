<template>
  <v-card>
    <control-header
      left-icon="fa-lightbulb-o"
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
        color="orange"
        hide-details
      />
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
        const valueObj = this.control.values['dim-response'] ? this.control.values['dim-response'] : this.control.values['dim']
        if (valueObj !== null && valueObj !== undefined) {
          return valueObj
        }
        return {}
      },
      setValue: {
        get () {
          return Math.round(this.getCurrentValueObj.value)
        },
        set (value) {
          const command = {
            control: this.control._id,
            endPoint: 'dim',
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
      }
    },

    data () {
      return {
        endPoints: [
          { type: 'dim', label: 'Dimmbefehl' },
          { type: 'dim-response', label: 'Bestätigung' }
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
