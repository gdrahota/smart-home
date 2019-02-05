import moment from 'moment'

export class TimeSlotJob {
  constructor (job) {
    this.job = job
  }

  check () {
    if (this.job.time !== 'timeSlots') {
      return null
    }

    const now = moment()

    // this type job can only be run every 15 minutes (0, 15, 30, 45 minute of the hour)
    if (now.minutes() % 15 !== 0) {
      return null
    }

    // Mo = 1, Sa = 6, Su = 7
    const dayOfTheWeek = now.day() > 0 ? now.day() : 7
    const hour = now.hour()
    const quarter = Math.floor(now.minutes() / 15)

    const attrName = 'd' + dayOfTheWeek + '-h' + hour + '-t' + quarter

    const highOrLow = this.job.timeSlots[attrName]
    console.log(attrName, highOrLow)

    if (highOrLow === undefined) {
      return null
    }

    return highOrLow ? 'maxValue' : 'minValue'
  }
}
