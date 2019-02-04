<template>
  <v-layout wrap row>
    <v-flex xs1 pr-3>
      <v-text-field
        v-model="time"
        label="Zeit"
        type="time"
        suffix="Uhr"
      ></v-text-field>
    </v-flex>

    <v-flex xs2 pr-3>
      <v-select
        :items="days"
        v-model="weekDays"
        item-value="value"
        item-text="text"
        label="Wochentage"
        multiple
      ></v-select>
    </v-flex>

    <v-flex xs3 pr-3>
      <v-select
        :items="excludeDays"
        v-model="excludeDayOptions"
        item-value="value"
        item-text="text"
        label="Ausschlusstage"
        multiple
      ></v-select>
    </v-flex>
    <v-flex xs6></v-flex>
  </v-layout>
</template>

<script>

  export default {
    computed: {
      time: {
        get () {
          return this.schedule.timeFixed
        },
        set (value) {
          this.$emit('updateTimeFixed', value)
        }
      },
      weekDays: {
        get () {
          return this.schedule.weekDays
        },
        set (value) {
          this.$emit('updateWeekDays', value.sort())
        }
      },
      excludeDays: {
        get () {
          return this.schedule.excludeDays
        },
        set (value) {
          this.$emit('updateExcludeDays', value)
        }
      },
    },

    data () {
      return {
        days: [
          { value: 1, text: 'Mo' },
          { value: 2, text: 'Di' },
          { value: 3, text: 'Mi' },
          { value: 4, text: 'Do' },
          { value: 5, text: 'Fr' },
          { value: 6, text: 'Sa' },
          { value: 7, text: 'So' },
        ],
        excludeDayOptions: [],
      }
    },

    props: {
      schedule: {
        type: Object,
        required: false
      },
    }
  }
</script>
