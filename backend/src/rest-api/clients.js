import ClientService from '../services/clients'

export const registerClientEndpoints = (io, socket) => {
  const cbLogin = credentials =>
    ClientService.login(credentials, socket.id, (err, clientAndRoles) => {
      if (err) {
        socket.emit('login_failed')
      } else {
        socket.emit('login_response', clientAndRoles)
        // Join private channel
        socket.join(clientAndRoles.client.clientId)
      }
    })

  const cbReLogin = clientId =>
    ClientService.reLogin(socket, clientId, (err, clientAndRoles) => {
      if (err || !clientAndRoles) {
        socket.emit('login_failed')
      } else {
        socket.emit('login_response', clientAndRoles)
        // Join private channel
        socket.join(clientAndRoles.client.clientId)
      }
    })

  const cbLogout = clientId =>
    ClientService.logOut(
      clientId, () => socket.to(clientId).emit('logout')
    )

  socket
    .on('login', cbLogin)
    .on('reLogin', cbReLogin)
    .on('logout', cbLogout)
}
