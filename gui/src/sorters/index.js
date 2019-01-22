export const sortByName = (a, b) => a.name.localeCompare(b.name)
export const sortByValue = (a, b) => a.value.localeCompare(b.value)
export const sortByLabel = (a, b) => a.label.localeCompare(b.label)
export const sortByText = (a, b) => a.text.localeCompare(b.text)

export const sortByControlTypeAndByName = (a, b) => {
  const resultLevelOne = a.controlType.localeCompare(b.controlType)
  if (resultLevelOne === 0) {
    return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
  }
  return resultLevelOne
}

export const sortByAddress = (a, b) => {
  if (!a || !a.address || !b || !b.address) {
    return 0
  }

  const addressPartsOfA = a.address.split('/')
  const addressPartsOfB = b.address.split('/')

  if (addressPartsOfA.length !== addressPartsOfB.length) {
    return 0
  }

  let AisBiggerThenB = true

  for (let i = 0; i < addressPartsOfA.length; i++) {
    const partA = parseInt(addressPartsOfA[i])
    const partB = parseInt(addressPartsOfB[i])
    if (partA < partB) {
      AisBiggerThenB = false
      break;
    }
  }

  return AisBiggerThenB ? 1 : -1
}
