import knxDataTypeFilter from './knx-data-type'
import knxAddressFilter from './knx-address'
import numberFilter from './number'

export default {
  register (Vue) {
    Vue.filter('knxDataType', knxDataTypeFilter)
    Vue.filter('knxAddress', knxAddressFilter)
    numberFilter(Vue)
  }
}
