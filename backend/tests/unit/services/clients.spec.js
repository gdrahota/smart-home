jest.mock('../../../src/repository/clients')
jest.mock('../../../src/services/users')
import ClientRepository from '../../../src/repository/clients'
import ClientService from '../../../src/services/clients'
import { UserService } from '../../../src/services/users'

const credentials = {
  username: 'user-a',
  password: 'password-123'
}

const socketId = 'socket-id-1'

const userData = {
  _id: 'user-id-1',
  accountName: 'user-a',
  state: 'active',
  verifyPassword: jest.fn(password => new Promise(resolve => resolve(password === 'password-123')))
}

UserService.findOne = jest.fn(() => new Promise(resolve => resolve(userData)))

const client = {
  _id: 'client-id-1',
  socketId: [],
  clientId: 'client-id-abc',
  userId: 'user-id-1',
  expires: '2019-02-10 12:07:05.570'
}
ClientRepository.add = jest.fn(
  (uuid, userId, socketId, expires) => new Promise(resolve => resolve({ ...client, socketId: [uuid], expires }))
)

describe('services/clients.js', () => {
  test('logout() should call repository.logout()', () => {
    ClientService.logOut()
    expect(ClientRepository.logOut).toHaveBeenCalledTimes(1)
  })

  test('logOutExpired() should call repository.logOutExpired()', () => {
    ClientService.logOutExpired()
    expect(ClientRepository.logOutExpired).toHaveBeenCalledTimes(1)
  })

  test('login() should call UserService.findOne()', () => {
    ClientService.login(credentials, socketId)
    expect(UserService.findOne).toHaveBeenCalledTimes(1)
  })

  test('login() should call UserService.findOne() with proper params', () => {
    ClientService.login(credentials, socketId)

    const userQuery = {
      accountName: credentials.username,
      state: 'active',
    }

    expect(UserService.findOne).toBeCalledWith(userQuery)
  })

  test('login() should return a proper user', async () => {
    const response = await ClientService.login(credentials, socketId)
    expect(response.user._id).toEqual(userData._id)
    expect(response.user.accountName).toEqual(userData.accountName)
    expect(response.user.state).toEqual(userData.state)
  })

  test('login() should return a proper client', async () => {
    const response = await ClientService.login(credentials, socketId)
    expect(response.client.socketId.length).toBe(1)
    expect(response.client.clientId).toBe(client.clientId)
  })

  test('login() with wrong password should return a rejected Promise values to UNKNOWN_USER_OR_WRONG_PASSWORD', async () => {
    const wrongCredentials = { ...credentials, password: 'wrong-password' }
    await expect(ClientService.login(wrongCredentials, socketId)).rejects.toBe('UNKNOWN_USER_OR_WRONG_PASSWORD')
  })
})
