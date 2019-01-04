<template>
  <v-card>
    <v-card-title>
      <span>{{ control.name }}</span>
      <v-icon v-if="getValue" class="float-right" :color="getColor">fa-circle</v-icon>
    </v-card-title>
    <v-card-text>
      <v-switch
        color="orange"
        v-model="setValue"
        hide-details
        :label="setValue ? 'an' : 'aus'"
        ripple
      />
      <div class="mt-3 caption grey--text float-right">{{ $moment(control.valueUpdated).format('DD.MM.YY / HH:mm:ss') }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
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
  table {
    border: 1px solid green;
  }

  .v-card {
    height: 140px;
  }

  .v-card__title {
    background-color: darkseagreen;
    padding-right: 5px;
    color: white;
    font-weight: 800;
    height: 40px;
  }

  .v-card__title > span {
    width: calc(100% - 25px);
  }

  .v-card__title > i {
    float: right;
  }
</style>
