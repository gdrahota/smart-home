<template>
  <component :is="component" :control="control" class="control"/>
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

    computed: {
      component () {
        switch (this.control.controlType) {
          case 'lightSwitch':
            return knxDefaultLightSwitch
          case 'lightDimmer':
            return knxDefaultLightDimmer
          case 'shutter':
            return knxDefaultShutter
          case 'rtc':
            return knxDefaultRtc
          case '14CharTextDisplay':
            return knxDefaultShortText
          case 'dayNightSwitch':
            return knxDefaultDayNightSwitch
        }
      }
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
    height: 180px;
  }
</style>
