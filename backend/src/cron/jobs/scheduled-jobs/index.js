import { CommandQueueService } from '../../../services/command-queue'
import { ScheduleService } from '../../../services/schedules'
import { FixedTimeJob } from './fixed'
import { DaytimesJob } from './daytimes'
import { TimeSlotJob } from './time-slots'

const getSchedules = async () => {
  return await ScheduleService.find({ active: true })
}

const getJobInstance = jobData => {
  switch (jobData.time) {
    case 'fixed':
      return new FixedTimeJob(jobData)
    case 'sunrise':
    case 'sunset':
      return new DaytimesJob(jobData)
    case 'timeSlots':
      return new TimeSlotJob(jobData)
    default:
      return
  }
}

export const runScheduledJobs = async () => {
  const jobs = await getSchedules()

  jobs.forEach(async jobData => {
      const job = getJobInstance(jobData)

      if (!job) {
        return
      }

      const valueAttribute = job.check()

      if (valueAttribute) {
        console.log('running job now', jobData.name, valueAttribute)

        jobData.commands.forEach(async command => {
            const endpointCommand = {
              control: command.control,
              endPoint: command.endpoint,
              value: command[valueAttribute],
              commandType: 'writeValue'
            }

            console.log(valueAttribute, endpointCommand)

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
}
