<template>
  <v-card>
    <control-header
      left-icon="fa-lightbulb-o"
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
        color="orange"
        v-model="setValue"
        :label="setValue ? 'an' : 'aus'"
        hide-details
        ripple
        class="pt-0 mt-4 pl-5"
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
          return 'orange'
        }
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
