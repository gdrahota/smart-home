<template>
  <tr class="schedule" :class="{ inactive: !active }">
    <td class="pl-1">
      <v-switch
        v-model="active"
        color="success"
      ></v-switch>
    </td>
    <td>{{ schedule.name }}</td>
    <td dim-if-inactive><span>{{ getTimeTypeAndOffset(schedule) }}</span></td>
    <td dim-if-inactive><span v-if="schedule.time !== 'fixed'">{{ getFormattedTimeFrame }} Uhr</span></td>
    <td dim-if-inactive><span>{{ getWeekDays }}</span></td>
    <td dim-if-inactive><span>{{ schedule.excludeDays.join(', ') }}</span></td>
    <td colspan="3" dim-if-inactive>
      <table class="table full-width">
        <tbody>
        <tr v-for="command of schedule.commands">
          <td>{{ getControlName(command.control) }}</td>
          <td>{{ getCommandName(command) }}</td>
          <td align="right">{{ command.value }}</td>
        </tr>
        </tbody>
      </table>
    </td>
    <td align="right" class="actions">
      <edit-schedule :scheduleToEdit="schedule"/>
      <confirm
        :title="'Diese Zeitsteuerung löschen'"
        @agree="() => remove(schedule._id)"
      ></confirm>
    </td>
  </tr>
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
  .inactive > td[dim-if-inactive] > * {
    opacity: 0.5;
  }

  td {
    vertical-align: top;
  }

  tr.schedule:first-child > td {
    border-top: 2px solid #ddd;
  }

  tr.schedule > td {
    padding-top: 22px;
    border-bottom: 1px solid #ddd;
  }

  tr.schedule > td:first-child {
    padding-top: 0px;
  }

  tr.schedule > td:last-child {
    padding-top: 10px;
  }

  tr.schedule > td.actions {
    position: relative;
    padding-top: 13px;
  }
</style>
