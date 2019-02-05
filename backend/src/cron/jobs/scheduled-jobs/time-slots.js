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
    const fifteenMinutesAgo = moment().subtract(15, 'minutes')

    // this type job can only be run every 15 minutes (0, 15, 30, 45 minute of the hour)
    if (now.minutes() % 15 !== 0) {
      return null
    }

    const highOrLowNow = this.getTimeSlot(now)
    const highOrLowQuarterAnHourAgo = this.getTimeSlot(fifteenMinutesAgo)

    // if the time slot is not set (corrupt data) skip it
    if (highOrLowNow === undefined) {
      return null
    }

    // if there isn't any change to the previous time slot then don't do anything
    if (highOrLowNow === highOrLowQuarterAnHourAgo) {
      return null
    }

    return highOrLowNow ? 'maxValue' : 'minValue'
  }

  getTimeSlot (now) {
    // Mo = 1, Sa = 6, Su = 7
    const dayOfTheWeek = now.day() > 0 ? now.day() : 7
    const hour = now.hour()
    const quarter = Math.floor(now.minutes() / 15)
    const attrName = 'd' + dayOfTheWeek + '-h' + hour + '-t' + quarter
    return this.job.timeSlots[attrName]
  }
}
