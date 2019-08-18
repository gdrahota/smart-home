<template>
  <v-card>
    <control-header
      :control="control"
      :label="control.name"
      :left-icon-color="getColor"
      left-icon="fa-lightbulb-o"
    />
    <v-card-text>
      <div class="pl-1 pr-1 caption grey--text hidden-xs-only">
        <span class="float-right" v-if="updatedAt">{{ $moment(updatedAt).format('DD.MM.YY / HH:mm:ss') }}</span>
      </div>
      <br/>
      <v-slider
        :label="setValue + ' %'"
        class="pt-4 mt-0 pl-2"
        color="orange"
        hide-details
        inverse-label
        step="10"
        v-model="setValue"
      ></v-slider>
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
