<template>
  <v-card>
    <control-header
      left-icon="fa-lightbulb-o"
      :label="control.name"
      right-icon="fa-circle"
      :right-icon-color="getColor"
    />
    <v-card-text>
      <v-switch
        color="orange"
        v-model="setValue"
        :label="setValue ? 'an' : 'aus'"
        hide-details
        ripple
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
        const valueObj = this.control.values['response'] ? this.control.values['response'] : this.control.values['switch']
        if (valueObj !== null && valueObj !== undefined) {
          return valueObj
        }
        return {}
      },
      setValue: {
        get () {
          return this.getCurrentValueObj.value
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
        if (this.getCurrentValueObj.value === true) {
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
          { type: 'switch', label: 'Schaltbefehl' },
          { type: 'response', label: 'Bestätigung' }
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
