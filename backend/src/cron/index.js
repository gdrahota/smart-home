import { ScheduleService } from '../services/schedules'
import { CommandQueueService } from '../services/command-queue'
import moment from 'moment'

const getSchedules = async () => {
  return await ScheduleService.find({ active: true })
}

const solarTimes = () => {
  const solarCalc = require('solar-calc')
  return new solarCalc(new Date(), 52.5084043, 13.5742931)
}

export const startCronJob = () => {
  const cron = require('node-cron')
  cron.schedule('* * * * *', async () => {
    const now = new Date()
    const SolarTimes = solarTimes()

    const jobs = await getSchedules()

    console.log(' ')

    jobs.forEach(async job => {
        // if today is not a valid day for this job then skip it1
        if (job.weekDays.indexOf(moment(now).weekday()) === -1) {
          return
        }

        let time

        if (job.time === 'fixed') {
          // it's always a fixed time -> no further calculations needed
          const timeParts = job.timeFixed.split(':')
          const hour = timeParts[0]
          const minute = timeParts[1]
          time = moment().set('hour', hour).set('minute', minute).set('second', 0)
        } else {
          time = moment(SolarTimes[job.time])
          time.add(job.timeOffset, 'm')

          // any time function needs to be checked if the calculated time is within the allowed time frame
          // if not then the action time will either be set to the beginn or the end of the time frame
          const timeFrameStartsParts = job.allowedTimeFrame.from.split(':').map(i => parseInt(i))
          const timeFrameEndsParts = job.allowedTimeFrame.till.split(':').map(i => parseInt(i))
          const timeFrameStarts = moment().set('hour', timeFrameStartsParts[0]).set('minute', timeFrameStartsParts[1]).set('second', 0)
          const timeFrameEnds = moment().set('hour', timeFrameEndsParts[0]).set('minute', timeFrameEndsParts[1]).set('second', 0)

          if (time.isBefore(timeFrameStarts)) {
            time = timeFrameStarts
          } else if (time.isAfter(timeFrameEnds)) {
            time = timeFrameEnds
          }

          console.log(
            moment().format('HH:mm:ss') + ':',
            timeFrameStarts.format('HH:mm') + ' <= ',
            time.format('HH:mm').toString() + ' >= ',
            timeFrameEnds.format('HH:mm')
          )
        }

        // check, if it's time now to execute the job commands
        if (time.format('HH:mm:ss').toString() === moment(now).format('HH:mm:ss')) {
          console.log('executing job:', job)

          job.commands.forEach(async command => {
              const endpointCommand = {
                control: command.control,
                endPoint: command.endpoint,
                value: command.value,
                commandType: 'writeValue'
              }

              try {
                await CommandQueueService.sendCommand(endpointCommand)
              }
              catch (e) {
                console.error(e)
              }
            }
          )
        }
      }
    )
  })
}

