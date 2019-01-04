<template>
  <v-card>
    <v-card-title>
      <span>{{ control.name }}</span>
    </v-card-title>
    <v-card-text>
      <v-chip label class="mt-2">Ist: {{ tempCurrentValue | number(1) }} °C / Soll: {{ tempTargetValue | number(1) }} °C</v-chip>
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
