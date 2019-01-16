import { ScheduleService } from '../services/schedules'

export const registerScheduleEndpoints = (io, socket) => {
  const cbAdd = async item => {
    try {
      await ScheduleService.add(item)
    }
    catch (err) {
      socket.emit('add_schedule_failed', err)
    }
  }

  const cbRemove = async id => {
    try {
      await ScheduleService.remove(id)
    }
    catch (err) {
      socket.emit('remove_schedule_failed', err)
    }
  }

  const cbUpdate = async item => {
    try {
      await ScheduleService.update(item)
    }
    catch (err) {
      socket.emit('update_schedule_failed', err)
    }
  }

  socket
    .on('add_schedule', cbAdd)
    .on('remove_schedule', cbRemove)
    .on('update_schedule', cbUpdate)
}
