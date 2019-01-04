<template>
  <div>
    <knx-default-light-switch :control="control" v-if="control.controlType === 'lightSwitch'"/>
    <knx-default-light-dimmer :control="control" v-if="control.controlType === 'lightDimmer'"/>
    <knx-default-shutter :control="control" v-if="control.controlType === 'shutter'"/>
    <knx-default-rtc :control="control" v-if="control.controlType === 'rtc'"/>
  </div>
</template>

<script>
  import knxDefaultLightSwitch from './knx-tp/default/light-switch'
  import knxDefaultLightDimmer from './knx-tp/default/light-dimmer'
  import knxDefaultShutter from './knx-tp/default/shutter'
  import knxDefaultRtc from './knx-tp/default/rtc'

  export default {
    components: {
      knxDefaultLightSwitch,
      knxDefaultLightDimmer,
      knxDefaultShutter,
      knxDefaultRtc
    },

    props: {
      control: {
        type: Object,
        required: true
      }
    }
  }
</script>
