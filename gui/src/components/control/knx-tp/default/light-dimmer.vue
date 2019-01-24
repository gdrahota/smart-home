<template>
  <v-card>
    <control-header
      left-icon="fa-lightbulb-o"
      :label="control.name"
      right-icon="fa-circle"
      :right-icon-color="getColor"
    />
    <v-card-text>
      <div class="pl-1 pr-1 caption grey--text hidden-xs-only">
        <span v-if="updatedAt" class="float-left">{{ $moment(updatedAt).format('DD.MM.YY / HH:mm:ss') }}</span>
        <control-endpoint-values :control="control" class="float-right"/>
      </div>
      <br/>
      <v-slider
        inverse-label
        v-model="setValue"
        step="10"
        :label="setValue + ' %'"
        color="orange"
        hide-details
        class="pt-0 mt-0"
      />
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
