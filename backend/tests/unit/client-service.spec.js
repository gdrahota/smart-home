import { mapLdapGroupsToAppRoles } from '../../src/services/client-service'

const appRolesToLdapRoles = {
  feature: {
    addItem: ['EnterListAdd', 'Admin'],
    readItem: ['EnterListRead', 'Admin'],
    removeItem: ['EnterListRemove', 'Admin'],
    updateItem: ['EnterListUpdate', 'Admin']
  }
}

describe('services/client-service.js', () => {
  test('mapLdapGroupsToAppRoles("Admin") should have feature.addItem = true', () => {
    const userRights = mapLdapGroupsToAppRoles(appRolesToLdapRoles, ['Admin'])
    expect(userRights.feature.addItem).toBe(true)
  })

  test('mapLdapGroupsToAppRoles("Admin") should have feature.addItem =  true', () => {
    const userRights = mapLdapGroupsToAppRoles(appRolesToLdapRoles, ['Admin'])
    expect(userRights.feature.readItem).toBe(true)
  })

  test('mapLdapGroupsToAppRoles("EnterListAdd") should have feature.addItem =  true', () => {
    const userRights = mapLdapGroupsToAppRoles(appRolesToLdapRoles, ['EnterListAdd'])
    expect(userRights.feature.addItem).toBe(true)
  })

  test('mapLdapGroupsToAppRoles("EnterListAdd") should have feature.addItem = false', () => {
    const userRights = mapLdapGroupsToAppRoles(appRolesToLdapRoles, ['EnterListAdd'])
    expect(userRights.feature.readItem).toBe(false)
  })

  test('mapLdapGroupsToAppRoles(["EnterListAdd", "EnterListRead"]) should have feature.addItem = true', () => {
    const userRights = mapLdapGroupsToAppRoles(appRolesToLdapRoles, ['EnterListAdd', 'EnterListRead'])
    expect(userRights.feature.readItem).toBe(true)
  })
})
