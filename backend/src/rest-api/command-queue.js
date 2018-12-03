import { CommandQueueService } from '../services/command-queue'

export const registerCommandQueueEndpoints = (io, socket) => {
  const cbUpsert = control =>
    CommandQueueService.upsert(control, err => {
      if (err) {
        socket.emit('upsert_control_data_point_failed', err)
      }
    })

  socket
    .on('upsert_command_queue', cbUpsert)
}
