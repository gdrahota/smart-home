<template>
  <div class="quarters">
    <div
      v-for="timeSlot in intervalsPerHour"
      class="quarter"
      :day="day"
      :hour="hour"
      :style="{ width: Math.floor(100 / intervalsPerHour) + '%' }"
      :q="(timeSlot - 1)"
    >
      <time-slot
        :day="day"
        :hour="hour"
        :timeSlot="(timeSlot - 1)"
      />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TimeSlot from './time-slot'

  export default {
    components: {
      TimeSlot
    },

    computed: {
      ...mapGetters({
        intervalsPerHour: 'timeSlots/intervalsPerHour',
      }),
      value () {
        return this.getTimeSlotValue(this.day, this.hour, this.timeSlot)
      }
    },
    props: {
      day: {
        type: Number,
        required: true,
      },
      hour: {
        type: Number,
        required: true,
      },
    }
  }
</script>

<style scoped>
  .quarters > .quarter {
    border: none;
    float: left;
    height: 30px;
    padding-bottom: 8px;
  }
</style>
