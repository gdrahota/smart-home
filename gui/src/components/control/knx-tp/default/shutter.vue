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
        v-model="position"
        step="10"
        :label="position + ' %'"
        :color="isWindowOpen ? 'red' : 'grey'"
        hide-details
      />
      <span id="important-message" v-if="isWindowOpen">Fenster ist geöffnet</span>
      <div class="mt-3 caption grey--text hidden-xs-only float-right">
        {{ $moment(control.valueUpdated).format('DD.MM.YY / HH:mm:ss') }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ControlHeader from '../control-header'

  export default {
    components: {
      ControlHeader,
    },

    computed: {
      ...mapGetters({
        commands: 'commandQueue/get'
      }),
      position: {
        get () {
          if (this.control.values && this.control.values.current) {
            return Math.round(this.control.values.current)
          }
          return 0
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
        if (this.position && this.position > 0) {
          return 'yellow'
        }
        return '#888'
      },
      isWindowOpen () {
        return this.control.values && this.control.values.windowState
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
</style>
