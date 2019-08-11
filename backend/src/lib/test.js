import etsProjectParser from './project-parser'

async function main () {
  let result
  let retVal

  // Check the commandline arguments
  if (!(process.argv[2] && process.argv[3])) {
    console.error('Usage: %s %s [pathToProjectFile] [pathToWorkingDirectory]', process.argv[0], process.argv[1])
    process.exit(-1)
  } else {
    console.log('Project file: %s', process.argv[2])
    console.log('Working dir.: %s', process.argv[3])
    console.log('#################################')
  }

  /*
   * Initialize the parser - it already unzips the knxproj-file into workdir
   * Both etsProjectFilePath and workdir must be absolute paths
   */
  retVal = await etsProjectParser(process.argv[2], process.argv[3])

  // Caught errors will be returned in retVal.error
  if (retVal.constructor === Error) {
    console.error(retVal)
    process.exit(-1)
  }

  // Parse the project and check the result
  if ((result = await retVal(true))) {
    if (!result || result.constructor === Error) {
      console.log('ERROR!', result)
    }
  }

  // Loads the project from 'OUTPUT.json'
  //result = await readProject('OUTPUT.json').catch(e => {
  //  throw e
  //})

  /*
   * For all get*ByKey() functions:
   *  The key argument is an array describing the "JSON-path"
   *
   *  E.g.:
   *
   *     {
   *      this: {
   *        that: {
   *          is: 1
   *        }
   *      }
   *    }
   *
   *    this.that.is => ['this', 'that', 'is']
   */

  // Prints general project information
  //console.log(result.getProjectInformation())

  // Prints all areas
  // console.log(result.getAreas())

  // Prints all areas with the given attribute
  // console.log(result.getAreaByKey('name', 'Backbone area'))

  // Prints all lines
  // console.log(result.getLines())

  // Prints all lines with the given attribute
  // console.log(result.getLineByKey('address', '1.1'))

  // Prints all unassigned devices
  // console.log(result.getUnassignedDevices())

  // Prints all unassigned devices with the given attribute
  // console.log(result.getUnassignedDeviceByKey(['programmingStatus', 'individualAddressLoaded'], false))

  // Prints all devices (excluding unassigned ones)
  // console.log(result.getDevices())

  // Prints all devices (excluding unassigned ones) with the given attribute
  // const items = result.getDeviceByKey(['ID'], 'P-05A5-0_DI-60')[0]
  // const items = result.getDeviceByKey(['ID'], 'P-05A5-0_DI-60')[0]
  //   .communicationObjectReference
  //   .filter(i => i.connectors.length > 0)
  //   .map(i => result.getGroupAddressByKey('ID', i.connectors[0].send[0].__groupAddressRefID))
  // console.log(items)

  /*
   * Prints all building parts without their subarrays. This is done to prevent building parts from being returned
   * multiple times at the same times in different places
   */
  // console.log(result.getBuildingParts(false))

  // console.log(JSON.stringify(result.buildings))

  // Prints all building parts with the given attribute
  // console.log(result.getBuildingPartByKey('name', 'WC'))

  // Prints all function contained in the building structure
  // console.log(result.getFunctions())

  // Prints all function with the given attribute
  // console.log(result.getFunctionByKey('ID', 'P-02A1-0_F-3'))

  // Prints all group addresses
  const getAddr = address => {
    const part2 = Math.floor(address / 2048)
    const rest2 = address - part2 * 2048
    const part1 = Math.floor(rest2 / 256)
    const rest1 = rest2 - part1 * 256
    return part2 + '/' + part1 + '/' + rest1
  }

  /*
    const groupAddresses = result
      .getGroupAddresses()
      .map(addr => {
        return {
          ...addr,
          address: getAddr(addr.address)
        }
      })
    console.log(groupAddresses)
  */

  // Prints all group addresses with the given attributes
  // console.log(result.getGroupAddressByKey('datapointType', 'DPST-1-1'))

  // Prints all product families contained in the project
  // console.log(result.getProductFamilies())

  // const families = result.getProductFamilies().map(pf => {
  //   return {
  //     name: pf.name,
  //     products: pf.products
  //   }
  // })
  // console.log(JSON.stringify(families))

  // Prints all products families with the given attribute
  // console.log(result.getProductFamilyByKey(['flags', 'isIPEnabled'], true))

  // Prints all products contained in the project
  //console.log(result.getProducts())

  // Prints all products with the given attribute
  // console.log(result.getProductByKey('ID', 'M-00C8_H-20101101-1-O00C5_P-92431AT'))

  // Prints all KNX device manufacturers contained in the project (Usually all existing manufacturers)
  // console.log(result.getManufacturers())

  // Prints all KNX device manufacturers with the given attribute
  // console.log(result.getManufacturerByKey('ID', 'M-0083'))

  // Prints all datapoint types
  // console.log(result.getDatapointTypes())

  // Prints all datapoint types with the given attribute
  // console.log(result.getDatapointTypeByKey('dptNumber', 244))

  // Prints all datapoint sub-types
  // console.log(result.getDatapointSubTypes())

  // Prints all datapoint sub-types with the given attribute
  // console.log(result.getDatapointSubTypeByKey('ID', 'DPST-1-1'))

  // Prints all medium types
  // console.log(result.getMediumTypes())

  // Prints all medium types with the given attribute
  // console.log(result.getMediumTypeByKey('name', 'IP'))

  // Prints all device application information entries
  // console.log(result.getDeviceApplicationInformation())

  // Prints all device application information entries with the given attribute
  // console.log(result.getDeviceApplicationInformationByKey('__manufacturerRefID', 'M-0083'))

  // Prints all maskversions
  // console.log(result.getMaskversions())

  // Prints all maskversions with the given attributes
  // console.log(result.getMaskversionByKey('ID', 'MV-0010'))

  // Write the project to an output file (in JSON format)
  // console.log('==> Writing the parsed project to OUTPUT.json ...')
  // console.log(await result.exportToJson('OUTPUT.json'))
}

main().finally()
