import { dueTime, getTimeFrame } from '../../../../src/cron/jobs/scheduled-jobs/daytimes'
import moment from 'moment'

const start = moment().set('hour', 8).set('minute', 0).set('second', 0)
const end = moment().set('hour', 10).set('minute', 0).set('second', 0)
const timeFrame = { start, end }

describe('cron/jobs/scheduled-jobs/daytimes', () => {
  test('getTimeFrame("8:00", "10:00") should return proper object', () => {
    const result = getTimeFrame({ from: '8:00', till: '10:00' })

    expect(result.start.format('HH:mm')).toEqual('08:00')
    expect(result.end.format('HH:mm')).toEqual('10:00')
  })

  test('dueTime() at 7:59 a.m. should fire at 8 a.m.', () => {
    const daytime = moment().set('hour', 7).set('minute', 59).set('second', 0)
    const result = dueTime(timeFrame, daytime)

    expect(result.format('HH:mm')).toEqual('08:00')
  })

  test('dueTime()  at 8:00 a.m. should fire at 8 a.m.', () => {
    const daytime = moment().set('hour', 8).set('minute', 0).set('second', 0)
    const result = dueTime(timeFrame, daytime)

    expect(result.format('HH:mm')).toEqual('08:00')
  })

  test('dueTime()  at 9:30 a.m. should fire at 9:30 a.m.', () => {
    const daytime = moment().set('hour', 9).set('minute', 30).set('second', 0)
    const result = dueTime(timeFrame, daytime)

    expect(result.format('HH:mm')).toEqual('09:30')
  })

  test('dueTime()  at 10:00 a.m. should fire at 10:00 a.m.', () => {
    const daytime = moment().set('hour', 10).set('minute', 0).set('second', 0)
    const result = dueTime(timeFrame, daytime)

    expect(result.format('HH:mm')).toEqual('10:00')
  })

  test('dueTime()  at 10:01 a.m. should fire at 10:00 a.m.', () => {
    const daytime = moment().set('hour', 10).set('minute', 1).set('second', 0)
    const result = dueTime(timeFrame, daytime)

    expect(result.format('HH:mm')).toEqual('10:00')
  })
})
