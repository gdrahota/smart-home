import moment from 'moment'

export class FixedTimeJob {
  constructor (job) {
    this.job = job
  }

  check () {
    if (this.job.time !== 'fixed') {
      return null
    }

    const now = new Date()

    // if today is not a valid day for this job then skip it
    if (this.job.weekDays.indexOf(moment(now).weekday()) === -1) {
      return null
    }

    // it's always a fixed time -> no further calculations needed
    const timeParts = this.job.timeFixed.split(':')
    const hour = timeParts[0]
    const minute = timeParts[1]
    const todaysExecutionTime = moment().set('hour', hour).set('minute', minute).set('second', 0)

    return todaysExecutionTime.format('HH:mm').toString() === moment(now).format('HH:mm') ? 'value' : null
  }
}
