<template>
  <v-card>
    <v-card-title>
      <span>{{ control.name }}</span>
      <v-icon v-if="position" class="float-right" :color="getColor">fa-circle</v-icon>
    </v-card-title>
    <v-card-text>
      <v-slider
        inverse-label
        v-model="position"
        step="10"
        :label="position + ' %'"
        color="orange"
        hide-details
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
        commands: 'commandQueue/get'
      }),
      position: {
        get () {
          if (this.control.values) {
            return Math.round(this.control.values)
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
