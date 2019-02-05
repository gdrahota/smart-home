import { getWeatherDataJob } from './jobs/openWether'
import { runScheduledJobs } from './jobs/scheduled-jobs'

// get weather data updates
export const startCronJob = () => {
  const cron = require('node-cron')

  cron.schedule('*/30 * * * *', async () => {
    await getWeatherDataJob()
  })

  // check for scheduled jobs to be run every minute
  cron.schedule('* * * * *', async () => {
    await runScheduledJobs()
  })
}
