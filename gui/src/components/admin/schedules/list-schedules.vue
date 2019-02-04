<template>
  <div>
    <v-layout wrap row>
      <v-flex xs1 pr-2>Aktiviert</v-flex>
      <v-flex xs3 pr-2>Name</v-flex>
      <v-flex xs1 pr-2>Tage</v-flex>
      <v-flex xs1 pr-2>Außer</v-flex>
      <v-flex xs5 pr-2>
        <v-layout>
          <v-flex xs7>Steuerelement</v-flex>
          <v-flex xs4>Befehl</v-flex>
          <v-flex xs1 right>Wert</v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs1></v-flex>
    </v-layout>

    <show-schedule
      v-for="schedule of schedules"
      :schedule="schedule"
      :key="'schedule' + schedule._id"
    />
    <edit-schedule
      :scheduleToEdit="{
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
  </div>
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

  .flex {
    font-size: 16px;
    font-weight: bold;
  }

  .flex:not([align]) {
    text-align: left;
    vertical-align: bottom;
    padding-bottom: 5px;
    padding-left: 5px;
  }
</style>
