<template>
  <v-card>
    <control-header
      left-icon="fa-text-width"
      :left-icon-color="getColor"
      :label="control.name"
      :control="control"
    />
    <v-card-text>
      <div class="pl-1 pr-1 caption grey--text hidden-xs-only">
        <span v-if="updatedAt" class="float-right">{{ $moment(updatedAt).format('DD.MM.YY / HH:mm:ss') }}</span>
      </div>
      <br/>
      <v-text-field
        v-model="setValue"
        label="Anzeigetext"
        :counter="14"hint="Max. 14 Zeichen"
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
          return 'orange'
        }
        return '#ccc'
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
