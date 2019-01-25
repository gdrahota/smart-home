<template>
  <div>
    <knx-default-light-switch :control="control" v-if="control.controlType === 'lightSwitch'"/>
    <knx-default-light-dimmer :control="control" v-if="control.controlType === 'lightDimmer'"/>
    <knx-default-shutter :control="control" v-if="control.controlType === 'shutter'"/>
    <knx-default-rtc :control="control" v-if="control.controlType === 'rtc'"/>
    <knx-default-short-text :control="control" v-if="control.controlType === '14CharTextDisplay'"/>
    <knx-default-day-night-switch :control="control" v-if="control.controlType === 'dayNightSwitch'"/>
  </div>
</template>

<script>
  import knxDefaultLightSwitch from './knx-tp/default/light-switch'
  import knxDefaultLightDimmer from './knx-tp/default/light-dimmer'
  import knxDefaultShutter from './knx-tp/default/shutter'
  import knxDefaultRtc from './knx-tp/default/rtc'
  import knxDefaultShortText from './knx-tp/default/short-text-display'
  import knxDefaultDayNightSwitch from './knx-tp/default/day-night-switch'

  export default {
    components: {
      knxDefaultDayNightSwitch,
      knxDefaultLightSwitch,
      knxDefaultLightDimmer,
      knxDefaultShutter,
      knxDefaultRtc,
      knxDefaultShortText,
    },

    props: {
      control: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
  div {
    height: 160px;
  }
</style>
