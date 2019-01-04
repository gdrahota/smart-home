import { CommandQueueService } from '../services/command-queue'

export const registerCommands = (io, socket) => {
  const cbSendCommand = async command => await CommandQueueService.sendCommand(command)

  socket.on('send_command', cbSendCommand)
}
