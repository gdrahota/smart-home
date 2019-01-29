<template>
  <v-card>
    <control-header
      left-icon="fa-lightbulb-o"
      :left-icon-color="getColor"
      :label="control.name"
      :control="control"
    />
    <v-card-text>
      <div class="pl-1 pr-1 caption grey--text hidden-xs-only">
        <span v-if="updatedAt" class="float-right">{{ $moment(updatedAt).format('DD.MM.YY / HH:mm:ss') }}</span>
      </div>
      <br/>
      <v-slider
        inverse-label
        v-model="setValue"
        step="10"
        :label="setValue + ' %'"
        color="orange"
        hide-details
        class="pt-4 mt-0"
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
