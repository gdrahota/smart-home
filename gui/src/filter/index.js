import knxDataTypeFilter from './knx-data-type'
import knxAddressFilter from './knx-address'

export default {
  register (Vue) {
    Vue.filter('knxDataType', knxDataTypeFilter);
    Vue.filter('knxAddress', knxAddressFilter);
  }
}
