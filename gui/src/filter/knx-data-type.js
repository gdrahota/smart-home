export default dataType => {
  switch (dataType.toString()) {
    case '1':
      return '1: ja/nein, an/aus, runter/hoch'
    case '2':
      return '2: 2 x ja/nein, an/aus'
    case '3':
      return '3: boolean + 3-bit unsigned value'
    case '4':
      return '4: 1 Zeichen (8bit)'
    case '5':
      return '5: 0..255'
    case '6':
      return '6: 8-bit 2\'s complement'
    case '7':
      return '7: 2 x 8-bit unsigned value'
    case '8':
      return '8: 2 x 8-bit 2\'s complement'
    case '9':
      return '9: 16-bit float'
    case '10':
      return '10: time'
    case '11':
      return '11: date'
    case '12':
      return '12: 4 x 8-bit unsigned value'
    case '13':
      return '13: 4 x 8-bit 2\'s complement'
    case '14':
      return '14: 32-bit float'
    case '15':
      return '15: access control'
    case '16':
      return '16: string -> 14 characters'
    case '17':
      return '17: scene number'
    case '18':
      return '18: scene control'
    case '19':
      return '19: time + data'
    case '20':
      return '20: 8-bit enumeration'
  }
}

