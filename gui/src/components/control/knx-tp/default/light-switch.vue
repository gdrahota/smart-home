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
      <div class="mt-3 caption grey--text float-right hidden-xs-only">
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
        commands: 'commandQueue/get',
        getControlDataPoint: 'controlDataPoints/getByControlAndEndPoint',
        getDataPoint: 'dataPoints/getById'
      }),
      setValue: {
        get () {
          return this.control.values
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
      getValue () {
        return this.control.values
      },
      getColor () {
        if (this.getValue === true) {
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
