<template>
  <time-slots
    :timeSlots="timeSlots"
    @update="values => $emit('update', values)"
  ></time-slots>
</template>

<script>
  import TimeSlots from '../../../../general/select-day-and-time'

  export default {
    components: {
      TimeSlots,
    },

    props: {
      schedule: {
        type: Object,
        required: false
      },
      timeSlots: {
        type: Object,
        required: false
      }
    }
  }
</script>
