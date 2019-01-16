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
      <th>Wert</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="schedule of schedules">
      <td :rowspan="getLinesPerSchedule(schedule)">
        <v-icon small v-if="schedule.state === 'active'" color="green">fa-check</v-icon>
        <v-icon small v-else-if="schedule.state === 'inactive'" color="grey">fa-remove</v-icon>
        <v-icon small v-else color="grey">fa-trash</v-icon>
      </td>
      <td :rowspan="getLinesPerSchedule(schedule)">{{ schedule.name }}</td>
      <td :rowspan="getLinesPerSchedule(schedule)">{{ getTimeTypeAndOffset(schedule) }} Min.</td>
      <td :rowspan="getLinesPerSchedule(schedule)">{{ getFormattedTimeFrame(schedule.allowedTimeFrame) }} Uhr</td>
      <td :rowspan="getLinesPerSchedule(schedule)">{{ getWeekDays(schedule.weekDays) }}</td>
      <td :rowspan="getLinesPerSchedule(schedule)">{{ schedule.excludeDays.join(', ') }}</td>
      <template v-for="command of schedule.commands">
        <td>{{ getControlName(command.control) }}</td>
        <td>{{ getCommandName(command) }}</td>
        <td>{{ command.value }}</td>
      </template>
      <td :rowspan="getLinesPerSchedule(schedule)" align="right">
        <v-btn icon>
          <v-icon small color="info">fa-cog</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon small color="red">fa-times</v-icon>
        </v-btn>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        schedules: 'schedules/get',
        selected: 'schedules/getSelected',
        getControlById: 'controls/getById',
        timeType: 'schedules/getTimeTypeAndOffset',
        getDefinitionByName: 'controls/getDefinitionByName',
      }),
      selection: {
        get () {
          return this.selected
        },
        set (newSelection) {
          if (newSelection) {
            newSelection = JSON.parse(JSON.stringify(newSelection))
          }
          this.select(newSelection)
        }
      }
    },

    methods: {
      ...mapMutations({
        select: 'schedules/select'
      }),
      getLinesPerSchedule (schedule) {
        const commands = schedule.commands.filter(i => i.control)
        return commands.length === 0 ? 1 : commands.length
      },
      getWeekDays (days) {
        return days.map(day => {
          switch (day) {
            case '1':
              return 'Mo'
            case '2':
              return 'Di'
            case '3':
              return 'Mi'
            case '4':
              return 'Do'
            case '5':
              return 'Fr'
            case '6':
              return 'Sa'
            case '7':
              return 'So'
            default:
              return day
          }
        }).join(', ')
      },
      getFormattedTimeFrame (timeFrame) {
        const getPart = part => part < 10 ? '0' + part.toString() : part.toString()

        const from = getPart(timeFrame.from.hours) + ':' + getPart(timeFrame.from.minutes)
        const till = getPart(timeFrame.till.hours) + ':' + getPart(timeFrame.till.minutes)

        return from + ' - ' + till
      },
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
            const endPoint = definition.endPoints.find(i => i.endPoint === command.dataType)
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
    }
  }
</script>

<style scoped>
  th {
    text-align: left;
    vertical-align: bottom;
  }
</style>
