<template>
  <v-card>
    <control-header
      left-icon="fa-bars"
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
        :color="isWindowOpen ? 'rgb(193, 1, 1)' : 'grey'"
        hide-details
        class="pt-0 mt-0"
      />
      <v-chip
        :value="isWindowOpen === true"
        color="rgb(193, 1, 1)"
        label
        class="full-width"
        outline
      >
        <v-avatar>
          <v-icon small>fa-exclamation</v-icon>
        </v-avatar>
        Fenster offen
      </v-chip>
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
        return this.control.values &&
          this.control.values['window-state-response'] &&
          this.control.values['window-state-response'].value &&
          this.control.values['window-state-response'].value === true
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
