<template>
  <div>
    <v-layout wrap row ref="time-slot-view">
      <v-flex xs1></v-flex>
      <v-flex xs5>
        <v-layout wrap row>
          <v-flex xs1 v-for="n in 12" :key="'h' + n" class="text-xs-center border">{{ n - 1 }}</v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs5 last>
        <v-layout wrap row>
          <v-flex xs1 v-for="n in 12" :key="'h' + (n + 12)" class="text-xs-center border">{{ n + 11 }}</v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs1></v-flex>
    </v-layout>

    <day
      v-for="day of getDays"
      :key="'d' + day.value"
      :day="day"
    ></day>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Day from './day'

  export default {
    components: {
      Day,
    },

    computed: {
      ...mapGetters({
        getDays: 'timeSlots/days',
        isInSelectionMode: 'timeSlots/isInSelectionMode',
        valueToUse: 'timeSlots/valueToUse',
        getTimeSlots: 'timeSlots/getTimeSlots',
      }),
      _timeSlots: {
        get () {
          return this.timeSlots
        },
        set () {}
      },
      _days: {
        get () {
          return this.days
        },
        set () {}
      },
    },

    created () {
      if (this.days) {
        this.setDays(this.days)
      }
      if (this.timeSlots) {
        this.setTimeSlots(this.timeSlots)
      }
    },

    data () {
      return {
        elem: null,
      }
    },

    methods: {
      ...mapMutations({
        setDays: 'timeSlots/setDaysMutation',
        setTimeSlots: 'timeSlots/setTimeSlotsMutation',
      }),
    },

    props: {
      days: {
        type: Array,
        required: false
      },
      timeSlots: {
        type: Object,
        required: false
      },
    },

    watch: {
      isInSelectionMode (value) {
        console.log('isInSelectionMode', value)
        if (!value) {
          this.$emit('update', this.getTimeSlots)
        }
      }
    }
  }
</script>

<style scoped>
  .border {
    /*border-left: 1px solid #bbb;*/
  }
</style>
