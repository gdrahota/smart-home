<template>
  <table class="table full-width">
    <thead>
    <tr>
      <th rowspan="2">Status</th>
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
      <th align="center">Wert</th>
    </tr>
    </thead>
    <tbody>
    <show-schedule v-for="schedule of schedules" :schedule="schedule"/>
    </tbody>
  </table>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ShowSchedule from './show-schedule'

  export default {
    components: {
      ShowSchedule
    },

    computed: {
      ...mapGetters({
        schedules: 'schedules/get',
      })
    },
  }
</script>

<style scoped>
  th {
    text-align: left;
    vertical-align: bottom;
  }
</style>
