<template>
  <table class="table full-width">
    <thead>
    <tr>
      <th rowspan="2">Aktiviert</th>
      <th rowspan="2">Name</th>
      <th rowspan="2">Zeitpunkt</th>
      <th rowspan="2">Zeitrahmen</th>
      <th rowspan="2">Tage</th>
      <th rowspan="2">außer</th>
      <th colspan="3">Kommando(s)</th>
      <th rowspan="2"></th>
    </tr>
    <tr>
      <th>Steuerelement</th>
      <th>Befehl</th>
      <th align="right">Wert</th>
    </tr>
    </thead>
    <tbody>
    <show-schedule v-for="schedule of schedules" :schedule="schedule"/>
    </tbody>
    <tfoot>
    <tr>
      <td class="pt-2">
        <edit-schedule :scheduleToEdit="{
          name: '',
          description: '',
          weekDays: [],
          excludeDays: [],
          time: 0,
          timeOffset: 0,
          allowedTimeFrame: {
            from: '0:00',
            till: '23:59'
          },
          commands: [],
          active: true
        }"/>
      </td>
    </tr>
    </tfoot>
  </table>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ShowSchedule from './show-schedule'
  import EditSchedule from './edit-schedule'

  export default {
    components: {
      EditSchedule,
      ShowSchedule,
    },

    computed: {
      ...mapGetters({
        schedules: 'schedules/get',
      })
    },
  }
</script>

<style scoped>
  table {
    border-spacing: 0;
  }

  th:not([align]) {
    text-align: left;
    vertical-align: bottom;
    padding-bottom: 5px;
  }
</style>
