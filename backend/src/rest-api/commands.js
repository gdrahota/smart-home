import { CommandQueueService } from '../services/command-queue'

export const registerCommands = (io, socket) => {
  const cbSendCommand = command =>
    CommandQueueService.sendCommand(command, err => {
      if (err) {
        socket.emit('send_command_failed', err)
      }
    })

  socket.on('send_command', cbSendCommand)
}
