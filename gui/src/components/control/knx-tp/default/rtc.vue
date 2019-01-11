<template>
  <v-card>
    <control-header
      left-icon="fa-thermometer-half"
      :label="control.name"
      right-icon="fa-circle"
      :right-icon-color="getColor"
    />
    <v-card-text>
      <v-chip label class="mt-2">Ist: {{ tempCurrentValue | number(1) }} °C / Soll: {{ tempTargetValue | number(1) }} °C</v-chip>
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
      tempCurrentValue () {
        return (this.control.values && this.control.values.current) ? this.control.values.current : 0
      },
      tempTargetValue () {
        return (this.control.values && this.control.values.target) ? this.control.values.target : 0
      },
      value: {
        get () {
          if (this.control.values && this.control.values.current) {
            return this.control.values.current
          }
          return 0
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
      getColor () {
        console.log(this.control)
        if (this.control.values) {
          if (this.control.values.state) {
            return 'orange'
          }
          if (this.control.values.stateRelavive && this.control.values.stateRelavive > 0) {
            return 'orange'
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
  .v-card {
    height: 140px;
  }
</style>
