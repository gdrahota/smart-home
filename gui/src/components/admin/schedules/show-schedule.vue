<template>
  <v-layout wrap row class="schedule" :class="{ inactive: !active }">
    <v-flex xs1 top>
      <v-switch
        v-model="active"
        color="success"
        hide-details
      ></v-switch>
    </v-flex>

    <v-flex xs3 pr-2 class="dim-if-inactive">
      <div>{{ schedule.name }}</div>

      <template v-if="['sunrise', 'sunset'].indexOf(schedule.time) !== -1">
        <ul>
          <li>Innerhalb: {{ getFormattedTimeFrame }} Uhr</li>
          <li>{{ getTimeTypeAndOffset(schedule) }}</li>
        </ul>
      </template>

      <template v-else-if="schedule.time === 'fixedTime'">
        <ul>
          <li>Feste Zeit: {{ getTimeTypeAndOffset(schedule) }}</li>
        </ul>
      </template>
      <template v-if="schedule.time === 'timeSlots'">
        <ul>
          <li>Zeitschlitze</li>
        </ul>
      </template>
    </v-flex>

    <v-flex xs1 class="dim-if-inactive pr-2">
      <span v-if="schedule.time !== 'timeSlots'">{{ getWeekDays }}</span>
    </v-flex>

    <v-flex xs1 pr-2>
      <span v-if="schedule.time !== 'timeSlots'">{{ schedule.excludeDays.join(', ') }}</span>
    </v-flex>

    <v-flex xs5 class="dim-if-inactive pr-2">
      <v-layout
        v-for="(command, idx) of schedule.commands"
        :key="schedule._id + idx"
        class="commands"
        row
        wrap
      >
        <template v-if="schedule.time !== 'timeSlots'">
          <v-flex xs7>{{ getControlName(command.control) }}</v-flex>
          <v-flex xs4>{{ getCommandName(command) }}</v-flex>
          <v-flex xs1 class="text-xs-right">{{ command.value }}</v-flex>
        </template>
        <template v-if="schedule.time === 'timeSlots'">
          <v-flex xs7>{{ getControlName(command.control) }}</v-flex>
          <v-flex xs3>{{ getCommandName(command) }}</v-flex>
          <v-flex xs1 class="text-xs-right">{{ command.maxValue }}</v-flex>
          <v-flex xs1 class="text-xs-right">{{ command.minValue }}</v-flex>
        </template>
      </v-layout>
    </v-flex>
    <v-flex xs1 pr-2>
      <edit-schedule :scheduleToEdit="schedule"/>
      <confirm
        :title="'Diese Zeitsteuerung löschen'"
        @agree="() => remove(schedule._id)"
      ></confirm>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import EditSchedule from './edit-schedule'

  export default {
    components: {
      EditSchedule,
    },

    computed: {
      ...mapGetters({
        schedules: 'schedules/get',
        selected: 'schedules/getSelected',
        getControlById: 'controls/getById',
        timeType: 'schedules/getTimeTypeAndOffset',
        getDefinitionByName: 'controls/getDefinitionByName',
      }),
      active: {
        get () {
          return this.schedule.active
        },
        set (newState) {
          this.save({ ...this.schedule, active: newState })
        }
      },
      getWeekDays () {
        return this
          .schedule.weekDays
          .sort()
          .map(day => {
            switch (day) {
              case 1:
                return 'Mo'
              case 2:
                return 'Di'
              case 3:
                return 'Mi'
              case 4:
                return 'Do'
              case 5:
                return 'Fr'
              case 6:
                return 'Sa'
              case 7:
                return 'So'
              default:
                return day
            }
          }).join(', ')
      },
      getFormattedTimeFrame () {
        const timeFrame = this.schedule.allowedTimeFrame
        return timeFrame.from + ' - ' + timeFrame.till
      },
    },

    methods: {
      ...mapActions({
        save: 'schedules/updateAction',
        remove: 'schedules/removeAction',
      }),
      ...mapMutations({
        selectSchedule: 'schedules/select',
      }),
      getControlName (controlId) {
        const control = this.getControlById(controlId)
        if (control) {
          const controlType = this.getDefinitionByName(control.controlType)
          return control.name + ' (' + controlType.label + ')'
        }
      },
      getCommandName (command) {
        const control = this.getControlById(command.control)
        if (control) {
          const definition = this.getDefinitionByName(control.controlType)
          if (definition) {
            const endPoint = definition.endPoints.find(i => i.endPoint === command.endpoint)
            if (endPoint) {
              return endPoint.label
            }
          }
        }
        return command.dataType
      },
      getTimeTypeAndOffset (schedule) {
        const timeType = this.timeType(schedule.time)

        if (timeType) {
          const parts = []

          if (timeType.value === 'fixed') {
            parts.push(schedule.timeFixed + ' Uhr')
          } else {
            parts.push(timeType.text)
            parts.push(schedule.timeOffset < 0 ? '-' : '+')
            parts.push(schedule.timeOffset)
            parts.push('Min.')
          }
          return parts.join(' ')
        }
      },
    },

    props: {
      schedule: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
  .layout.schedule:nth-child(even) {
    background-color: #eee;
  }

  .flex {
    padding: 5px;
  }

  .inactive .dim-if-inactive {
    opacity: 0.5;
  }

  .commands > .flex {
    padding-bottom: 0;
    padding-top: 0;
  }

  .top .v-input--selection-controls {
    margin-top: 0 !important;
    position: relative;
    top: -5px;
    width: 40px;
  }
</style>
