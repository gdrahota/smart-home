import moment from 'moment'

const solarTimes = () => {
  const solarCalc = require('solar-calc')
  return new solarCalc(new Date(), 52.5084043, 13.5742931)
}

const SolarTimes = solarTimes()

export const dueTime = (timeFrame, daytime) => {
  if (daytime.isBefore(timeFrame.start)) {
    return timeFrame.start
  } else if (daytime.isAfter(timeFrame.end)) {
    return timeFrame.end
  } else {
    return daytime
  }
}

export const getTimeFrame = allowedTimeFrame => {
  const timeFrameStartsParts = allowedTimeFrame.from.split(':').map(i => parseInt(i))
  const timeFrameEndsParts = allowedTimeFrame.till.split(':').map(i => parseInt(i))
  const start = moment().set('hour', timeFrameStartsParts[0]).set('minute', timeFrameStartsParts[1]).set('second', 0)
  const end = moment().set('hour', timeFrameEndsParts[0]).set('minute', timeFrameEndsParts[1]).set('second', 0)
  return { start, end }
}

export class DaytimesJob {
  constructor (job) {
    this.job = job
  }

  check () {
    if (['sunrise', 'sunset'].indexOf(this.job.time) === -1) {
      return null
    }

    const now = new Date()

    // if today is not a valid day for this job then skip it
    if (this.job.weekDays.indexOf(moment(now).weekday()) === -1) {
      return null
    }

    // get the actual time (sunrise, sunset, etc.)
    const daytime = moment(SolarTimes[this.job.time])

    // add any defined offset (+/- amount in minutes)
    if (this.job.timeOffset) {
      daytime.add(this.job.timeOffset, 'm')
    }

    const timeFrame = getTimeFrame(this.job.allowedTimeFrame)

    const todaysExecutionTime = dueTime(timeFrame, daytime)

    // we need to check if the calculated time is within the allowed time frame
    // if not then the action time will either be set to the begin or the end of the time frame
    return todaysExecutionTime.format('HH:mm').toString() === moment(now).format('HH:mm')
  }
}
