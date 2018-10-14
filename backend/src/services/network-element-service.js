import NetworkElementRepository from '../database/repository/network-element-repository'

const getNetworkElementsFromSource = () =>
  new Promise((resolve, reject) => {
    NetworkElementRepository
      .getNetworkElementsFromSource()
      .then(
        data => resolve(data),
        err => reject(err)
      )
  })

const getNetworkElements = () =>
  new Promise((resolve, reject) => {
    NetworkElementRepository
      .getNetworkElements()
      .then(
        data => resolve(data),
        err => reject(err)
      )
  })

const getNetworkElementBasics = cb =>
  NetworkElementRepository.getNetworkElements((err, networkElements) => {
    if (err) {
      cb(err)
    } else {
      const response = networkElements.map(elem => {
        return {
          facilityId: elem.NODE,
          postCode: elem.PLZ,
          city: elem.ORT,
          street: elem.STRASSE,
          site: elem.SITE,
          noc: elem.NOC
        }
      })

      cb(null, response)
    }
  })

const getNetworkElementNodes = cb =>
  NetworkElementRepository.getNetworkElements((err, networkElements) => {
    if (err) {
      cb(err)
    } else {
      cb(null, networkElements.map(elem => { node: elem.NODE }))
    }
  })

const getNetworkElementByFacilityId = facilityId =>
  new Promise((resolve, reject) => {
    NetworkElementRepository.getNetworkElementByFacilityId(facilityId)
      .then(
        data => resolve(data),
        err => reject(err)
      )
  })

const removeAllNetworkElements = () =>
  new Promise((resolve, reject) => {
    NetworkElementRepository.removeAllNetworkElements()
      .then(
        () => resolve(),
        err => reject(err)
      )
  })

const addNetworkElement = networkElement =>
  new Promise((resolve, reject) => {
    NetworkElementRepository.addNetworkElement(networkElement)
      .then(
        doc => resolve(doc),
        err => reject(err)
      )
  })

export default {
  getNetworkElementsFromSource,
  getNetworkElements,
  getNetworkElementBasics,
  getNetworkElementNodes,
  getNetworkElementByFacilityId,
  removeAllNetworkElements,
  addNetworkElement
}
