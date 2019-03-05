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
/*
const response = {
  "coord": { "lon": 13.59, "lat": 52.52 },
  "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }],
  "base": "stations",
  "main": { "temp": -3.99, "pressure": 1007, "humidity": 85, "temp_min": -5, "temp_max": -3 },
  "visibility": 10000,
  "wind": { "speed": 5.1, "deg": 110 },
  "clouds": { "all": 0 },
  "dt": 1548192000,
  "sys": { "type": 1, "id": 1262, "message": 0.0033, "country": "DE", "sunrise": 1548140456, "sunset": 1548171261 },
  "id": 2892051,
  "name": "Kaulsdorf",
  "cod": 200
}

const w = '-10°C  -22/-18'
*/
