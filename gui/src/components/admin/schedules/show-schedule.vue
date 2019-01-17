<template>
  <tr>
    <td :rowspan="getLinesPerSchedule">
      <v-icon small v-if="schedule.state === 'active'" color="green">fa-check</v-icon>
      <v-icon small v-else-if="schedule.state === 'inactive'" color="grey">fa-remove</v-icon>
      <v-icon small v-else color="grey">fa-trash</v-icon>
    </td>
    <td :rowspan="getLinesPerSchedule">{{ schedule.name }}</td>
    <td :rowspan="getLinesPerSchedule">{{ getTimeTypeAndOffset(schedule) }} Min.</td>
    <td :rowspan="getLinesPerSchedule">{{ getFormattedTimeFrame }} Uhr</td>
    <td :rowspan="getLinesPerSchedule">{{ getWeekDays }}</td>
    <td :rowspan="getLinesPerSchedule">{{ schedule.excludeDays.join(', ') }}</td>
    <template v-for="command of schedule.commands">
      <td>{{ getControlName(command.control) }}</td>
      <td>{{ getCommandName(command) }}</td>
      <td>{{ command.value }}</td>
    </template>
    <td :rowspan="getLinesPerSchedule" align="right">
      <edit-schedule :scheduleToEdit="schedule"/>
      <v-btn icon>
        <v-icon small color="red">fa-times</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import EditSchedule from './edit-schedule'

  export default {
    components: {
      EditSchedule
    },

    computed: {
      ...mapGetters({
        schedules: 'schedules/get',
        selected: 'schedules/getSelected',
        getControlById: 'controls/getById',
        timeType: 'schedules/getTimeTypeAndOffset',
        getDefinitionByName: 'controls/getDefinitionByName',
      }),
      getLinesPerSchedule () {
        const commands = this.schedule.commands.filter(i => i.control)
        return commands.length === 0 ? 1 : commands.length
      },
      getWeekDays () {
        return this.schedule.weekDays.map(day => {
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
      ...mapMutations({
        selectSchedule: 'schedules/select'
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
          parts.push(timeType.text)
          parts.push(schedule.timeOffset < 0 ? '-' : '+')
          parts.push(schedule.timeOffset)
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
