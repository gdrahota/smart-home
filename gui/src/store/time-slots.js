const populateDefaultDays = () => [
  { text: 'Mo', value: 1 },
  { text: 'Di', value: 2 },
  { text: 'Mi', value: 3 },
  { text: 'Do', value: 4 },
  { text: 'Fr', value: 5 },
  { text: 'Sa', value: 6 },
  { text: 'So', value: 7 },
]

const populateDefaultTimeSlots = (days, intervalsPerHour) => {
  const timeSlots = {}
  days.forEach(d => {
    for (let h = 0; h < 24; h++) {
      for (let t = 0; t < intervalsPerHour; t++) {
        const name = 'd' + d.value + '-h' + h + '-t' + t
        timeSlots[name] = false
      }
    }
  })
  return timeSlots
}

const defaultDays = populateDefaultDays()
const defaultIntervalsPerHour = 6

const state = {
  intervalsPerHour: 4,
  days: defaultDays,
  timeSlots: populateDefaultTimeSlots(defaultDays, defaultIntervalsPerHour),
  isInSelectionMode: null,
  valueToUse: null,
}

const setDaysMutation = (state, days) => {
  state.days = days
}

const setTimeSlotsMutation = (state, timeSlots) => {
  state.timeSlots = timeSlots
}

const setTimeSlotValueMutation = (state, { day, hour, timeSlot, value }) => {
  state.timeSlots['d' + day + '-h' + hour + '-t' + timeSlot] = value
}

const setValueToUseMutation = (state, value) => {
  state.valueToUse = value
}

const startMutation = state => {
  state.isInSelectionMode = true
}

const stopMutation = state => {
  state.isInSelectionMode = null
  state.valueToUse = null
}

const mutations = {
  setDaysMutation,
  setTimeSlotsMutation,
  startMutation,
  stopMutation,
  setTimeSlotValueMutation,
  setValueToUseMutation
}

const getters = {
  days: state => state.days,
  isInSelectionMode: state => state.isInSelectionMode,
  intervalsPerHour: state => state.intervalsPerHour,
  valueToUse: state => state.valueToUse,
  getTimeSlotValue: state => (day, hour, timeSlot) => state.timeSlots['d' + day + '-h' + hour + '-t' + timeSlot],
  getTimeSlots: state => state.timeSlots,
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
