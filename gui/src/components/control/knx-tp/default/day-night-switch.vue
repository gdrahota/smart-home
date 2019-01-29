<template>
  <v-card>
    <control-header
      left-icon="fa-toggle-on"
      :left-icon-color="getColor"
      :label="control.name"
      :control="control"
    />
    <v-card-text>
      <div class="pl-2 pr-2 pb-0 caption grey--text hidden-xs-only">
        <span v-if="updatedAt" class="float-right">{{ $moment(updatedAt).format('DD.MM.YY / HH:mm:ss') }}</span>
      </div>
      <br/>
      <v-switch
        color="yellow"
        v-model="setValue"
        :label="setValue ? 'Tag' : 'Nacht'"
        :color="getColor"
        hide-details
        ripple
        class="pt-0 mt-1 pl-5"
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
        const valueObj = this.control.values['set-day']
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
          console.log(value)
          const command1 = {
            control: this.control._id,
            endPoint: 'set-day',
            value: value,
          }

          const command2 = {
            control: this.control._id,
            endPoint: 'set-night',
            value: !value,
          }

          console.log((JSON.parse(JSON.stringify(command1))))
          this.sendCommand(command1)
          console.log((JSON.parse(JSON.stringify(command2))))
          this.sendCommand(command2)
          console.log(' -- ')
        }
      },
      getColor () {
        if (this.getCurrentValueObj.value === true) {
          return 'green lighten-1'
        }
        return 'black'
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

<style scoped>
  .v-card__text {
    padding-top: 6px;
  }
</style>
