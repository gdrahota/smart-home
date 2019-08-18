import { FacilityAttributesService } from '../services/facility-attributes'
import { FacilityAttributeValuesService } from '../services/facility-attribute-values'
import { DataPointService } from '../services/data-points'

export const registerFileUploadEndpoints = (io, socket) => {
  const cbAddObjects = async setup => {
    try {
      console.log(Object.keys(setup))

      const room = await FacilityAttributesService.add({
        facilityId: setup.facilityId,
        name: 'Raum',
      })

      const roomNameCb = roomName => FacilityAttributeValuesService.add({
        facilityId: setup.facilityId,
        facilityAttributeId: room._id,
        value: roomName,
      })

      await Promise.all(setup.roomNames.map(roomNameCb))

      const groupAddressCb = groupsAddress => DataPointService.add({
        controlSystem: setup.knxIpInterface,
        address: groupsAddress.address,
        description: groupsAddress.description,
        dataType: groupsAddress.dataType,
      })

      await Promise.all(setup.groupAddresses.map(groupAddressCb))
    } catch (err) {

      socket.emit('add_objects_file-upload_failed', err)
    }
  }

  socket.on('addObjects.file-upload', cbAddObjects)
}
