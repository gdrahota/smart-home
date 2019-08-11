export default class {
  constructor (projectDataFromJson) {
    this.dataObj = projectDataFromJson
    this.groupAddressLevels = this.getGroupAddressLevels()
  }

  translateNumberIntoKnxAddress (numericValue) {
    switch (this.groupAddressLevels) {
      case 3:
        const part2 = Math.floor(numericValue / 2048)
        const rest2 = numericValue - part2 * 2048
        const part1 = Math.floor(rest2 / 256)
        const rest1 = rest2 - part1 * 256
        return part2 + '/' + part1 + '/' + rest1
      default:
        return numericValue
    }
  }

  getGroupAddressLevels () {
    switch (this.dataObj.getProjectInformation().groupAddressStyle) {
      case 'ThreeLevel':
        return 3
      case 'TwoLevel':
        return 2
      default:
        return 1
    }
  }

  getGroupAddresses () {
    return this.dataObj
      .getGroupAddresses()
      .map(addr => {
        return {
          ID: addr.ID,
          name: addr.name,
          address: this.translateNumberIntoKnxAddress(addr.address),
          passTroughLineCoupler: addr.passTroughLineCoupler,
          centralFlag: addr.centralFlag,
          dataPointType: this._getDataPointDefinition(addr.datapointType)
        }
      })
  }

  getProjectInformation () {
    return this.dataObj.getProjectInformation()
  }

  getProduct (productId) {
    const products = this.dataObj.getProductByKey('ID', productId)
    return products && products.length > 0 ? products[0] : null
  }

  _getGroupAddress (ref) {
    return {
      ...ref,
      address: this.translateNumberIntoKnxAddress(ref.address)
    }
  }

  _getConnector (connector) {
    const response = {
      ...connector,
      send: connector.send.map(ga => {
        const groupAddresses = this.dataObj.getGroupAddressByKey('ID', ga.__groupAddressRefID)
        return groupAddresses ? this._getGroupAddress(groupAddresses[0]) : null
      }),
      receive: connector.receive.map(ga => {
        const groupAddresses = this.dataObj.getGroupAddressByKey('ID', ga.__groupAddressRefID)
        return groupAddresses ? this._getGroupAddress(groupAddresses[0]) : null
      })
    }

    return response
  }

  _getCommunicationObjectReference (ref) {
    const response = {
      ...ref,
      connectors: ref.connectors && ref.connectors.length > 0 ? ref.connectors.map(c => this._getConnector(c)) : []
    }

    return response
  }

  _getCommunicationObjectReferences (ref) {
    const keys = Object.keys(ref)

    const response = {
      ...ref
    }

    keys.forEach(key => {
      response[key] = this._getCommunicationObjectReference(ref[key])
    })

    // console.log(response)

    return response
  }

  getDevices () {
    return this.dataObj.getDevices().map(i => {
      return {
        ...i,
        product: this.getProduct(i.__referenceIDs.productRefID),
        communicationObjectReference: this._getCommunicationObjectReferences(i.communicationObjectReference)
      }
    })
  }

  _getDataPointDefinition (dataPointName) {
    if (!dataPointName) {
      return null
    }

    const mainDataPointTypeNumber = parseInt(dataPointName.split('-')[1])

    const dataPointType = this.dataObj.getDatapointTypes().find(dataPointType => dataPointType.dptNumber === mainDataPointTypeNumber)

    if (!dataPointType) {
      return null
    }

    const response = {
      ID: dataPointType.ID,
      number: dataPointType.dptNumber,
      name: dataPointType.dptName,
      text: dataPointType.dptText,
      subtype: dataPointType.datapointSubtypes.find(st => st.ID === dataPointName),
    }

    delete response.datapointSubtypes

    return response
  }

  getBuildingParts () {
    return this.dataObj.getBuildingParts(true)
  }
}
