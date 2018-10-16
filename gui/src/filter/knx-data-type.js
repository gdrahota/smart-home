import Vue from 'vue'

Vue.filter('knxDataType', dataType => {
  switch (dataType.toString()) {
    case '1':
      return 'ja/nein, an/aus, runter/hoch'
    case '2':
      return '2 x ja/nein, an/aus'
    case '3':
      return 'boolean + 3-bit unsigned value'
    case '4':
      return '1 Zeichen (8bit)'
    case '5':
      return '0..255'
    case '6':
      return '8-bit 2\'s complement'
    case '7':
      return '2 x 8-bit unsigned value'
    case '8':
      return '2 x 8-bit 2\'s complement'
    case '9':
      return '16-bit float'
    case '10':
      return 'time'
    case '11':
      return 'date'
    case '12':
      return '4 x 8-bit unsigned value'
    case '13':
      return '4 x 8-bit 2\'s complement'
    case '14':
      return '32-bit float'
    case '15':
      return 'access control'
    case '16':
      return 'string -> 14 characters'
    case '17':
      return 'scene number'
    case '18':
      return 'scene control'
    case '19':
      return 'time + data'
    case '20':
      return '8-bit enumeration'
  }
})
