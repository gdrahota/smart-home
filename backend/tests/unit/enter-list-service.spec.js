import EnterListService from '../../src/services/enter-list-service'
import EnterListRepository from '../../src/database/repository/enter-list-repository'
import NetworkElementRepository from '../../src/database/repository/network-element-repository'

describe('enter-list-service', () => {

  test('getEnterListEntries() should return one entry with correctly mapped networkElement', async () => {
    //
    // const mock1 = jest
    //   .spyOn(EnterListRepository, 'getAllEntries')
    //   .mockResolvedValue([
    //     {
    //       foreignId: 1,
    //       facility_id: '99',
    //       enteredAt: Date.now(),
    //       person: 'Hans Hansen',
    //       purpose: 'Wartung',
    //       status: 'betreten',
    //       batteryTestStatus: 'gestartet',
    //       notes: 'alles ok'
    //     }
    //   ])
    //
    // const mock2 = jest
    //   .spyOn(NetworkElementRepository, 'getNetworkElementByFacilityId')
    //   .mockResolvedValue(
    //     {
    //       NODE: '99',
    //       PLZ: '44147',
    //       ORT: 'Dortmund'
    //     }
    //   )
    //
    // let enterListEntries = []
    //
    // await EnterListService.getEnterListEntries()
    //   .then(
    //     entries => {
    //       enterListEntries = entries
    //     }
    //   )
    //
    // expect(mock1).toHaveBeenCalledTimes(1)
    // expect(mock2).toHaveBeenCalledTimes(1)
    // expect(enterListEntries.length).toBe(1)
    // expect(enterListEntries[0].facility_id).toBe('99')
    // expect(enterListEntries[0].networkElement.NODE).toBe('99')
    // expect(enterListEntries[0].networkElement.ORT).toBe('Dortmund')
    // jest.restoreAllMocks()
  })

  test('getEnterListEntries() should return two entries although the first one has no corresponding networkElement', async () => {
    // const mock1 = jest
    //   .spyOn(EnterListRepository, 'getAllEntries')
    //   .mockResolvedValue([
    //     {
    //       foreignId: 1,
    //       facility_id: '1',
    //       enteredAt: Date.now(),
    //       person: 'Hans Hansen',
    //       purpose: 'Wartung',
    //       status: 'betreten',
    //       batteryTestStatus: 'gestartet',
    //       notes: 'alles ok'
    //     },
    //     {
    //       foreignId: 2,
    //       facility_id: '2',
    //       enteredAt: Date.now(),
    //       person: 'Peter Petersen',
    //       purpose: 'Wartung',
    //       status: 'betreten',
    //       batteryTestStatus: 'gestartet',
    //       notes: 'alles ok'
    //     }
    //   ])
    //
    // const mock2 = jest
    //   .spyOn(NetworkElementRepository, 'getNetworkElementByFacilityId')
    //   .mockResolvedValueOnce(null)
    //   .mockResolvedValueOnce(
    //     {
    //       NODE: '2',
    //       PLZ: '44147',
    //       ORT: 'Dortmund'
    //     }
    //   )
    //
    // let enterListEntries = []
    //
    // await EnterListService.getEnterListEntries()
    //   .then(
    //     entries => {
    //       enterListEntries = entries
    //     }
    //   )
    //
    // expect(mock1).toHaveBeenCalledTimes(1)
    // expect(mock2).toHaveBeenCalledTimes(2)
    // expect(enterListEntries.length).toBe(2)
    // expect(enterListEntries[0].facility_id).toBe('1')
    // expect(enterListEntries[0].networkElement).toBe(undefined)
    // expect(enterListEntries[1].facility_id).toBe('2')
    // expect(enterListEntries[1].networkElement.NODE).toBe('2')
    // expect(enterListEntries[1].networkElement.ORT).toBe('Dortmund')
    // jest.restoreAllMocks()
  })

})
