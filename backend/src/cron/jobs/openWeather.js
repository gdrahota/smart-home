import { ExternalDataSourceService } from '../../services/external-data-sources'
import { CommandQueueService } from '../../services/command-queue'

const https = require('https')

export const getWeatherDataJob = async () => {
  const QUERY = { type: 'openWeatherMap', active: true }
  const openWeatherConfigs = await ExternalDataSourceService.find(QUERY)

  openWeatherConfigs.forEach(openWeatherConfig => {
    const url = []
    url.push('https://api.openweathermap.org/data/2.5/weather?')
    url.push('id=' + openWeatherConfig.config.cityId)
    url.push('&appid=' + openWeatherConfig.config.apiKey)
    url.push('&units=metric')

    https.get(
      url.join(''),
      resp => {
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        })
        resp.on('end', async () => {
          data = JSON.parse(data)
          const value = Math.round(data.main.temp) + 'C -> ' + Math.round(data.main.temp_min) + '/' + Math.round(data.main.temp_max)
          openWeatherConfig.commands.forEach(async controlId => {
            const command = {
              control: controlId,
              endPoint: 'set-text',
              commandType: 'writeValue',
              value
            }
            console.log(command)
            await CommandQueueService.sendCommand(command)
          })

        })
      }
    )
  })
}
