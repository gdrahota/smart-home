import { ExternalDataSourceService } from '../services/external-data-sources'

export const registerExternalDataSourcesEndpoints = (io, socket) => {
  const cbAdd = async item => {
    try {
      await ExternalDataSourceService.add(item)
    }
    catch (err) {
      socket.emit('add_external_data_source_failed', err)
    }
  }

  const cbRemove = async id => {
    try {
      await ExternalDataSourceService.remove(id)
    }
    catch (err) {
      socket.emit('remove_external_data_source_failed', err)
    }
  }

  const cbUpdate = async item => {
    try {
      console.log(item)
      await ExternalDataSourceService.update(item)
    }
    catch (err) {
      socket.emit('update_external_data_source_failed', err)
    }
  }

  socket
    .on('add_external_data_source', cbAdd)
    .on('update_external_data_source', cbUpdate)
    .on('remove_external_data_source', cbRemove)
}
