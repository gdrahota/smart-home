<template>
  <v-card>
    <v-card-text>
      <list-schedules/>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex'

  import ListSchedules from './list-schedules'

  export default {
    components: {
      ListSchedules,
    },

    computed: {
      ...mapGetters({
        selected: 'schedules/getSelected',
      }),
      showEditScheduleDialog: {
        get () {
          return this.selected !== null ? true : false
        },
        set () {}
      }
    }
  }
</script>
