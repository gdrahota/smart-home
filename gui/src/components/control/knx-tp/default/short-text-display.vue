<template>
  <v-card>
    <control-header
      left-icon="fa-text"
      :label="control.name"
      right-icon="fa-circle"
      :right-icon-color="getColor"
    />
    <v-card-text>
      <div class="pl-2 pr-2 pb-0 caption grey--text hidden-xs-only">
        <span v-if="updatedAt" class="float-left">{{ $moment(updatedAt).format('DD.MM.YY / HH:mm:ss') }}</span>
        <control-endpoint-values :control="control" class="float-right"/>
      </div>
      <br/>
      <v-text-field
        v-model="setValue"
        label="Anzeigetext"
        hide-details
        ripple
        class="pt-0 mt-1"
      ></v-text-field>
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
        const valueObj = this.control.values ? this.control.values['set-text'] : null
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
            endPoint: 'set-text',
            value
          }
          this.sendCommand(command)
        }
      },
      getColor () {
        if (this.getCurrentValueObj.timestamp) {
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
