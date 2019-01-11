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
        v-model="currentValue"
        step="10"
        :label="currentValue + ' %'"
        color="orange"
        hide-details
      />
      <div class="mt-3 caption grey--text float-right hidden-xs-only">{{ $moment(control.valueUpdated).format('DD.MM.YY / HH:mm:ss') }}
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
      currentValue: {
        get () {
          if (this.control.values) {
            return Math.round(this.control.values)
          }
          return 0
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
        if (this.currentValue && this.currentValue > 0) {
          return 'yellow'
        }
        return '#888'
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
</style>
