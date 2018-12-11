<template>
  <div>
    <knx-default-light-switch :control="control" v-if="control.controlType === 'lightSwitch'"/>
    <knx-default-light-dimmer :control="control" v-if="control.controlType === 'lightDimmer'"/>
    <knx-default-shutter :control="control" v-if="control.controlType === 'shutter'"/>
  </div>
</template>

<script>
  import knxDefaultLightSwitch from './knx-tp/default/light-switch'
  import knxDefaultLightDimmer from './knx-tp/default/light-dimmer'
  import knxDefaultShutter from './knx-tp/default/shutter'

  export default {
    components: {
      knxDefaultLightSwitch,
      knxDefaultLightDimmer,
      knxDefaultShutter
    },

    props: {
      control: {
        type: Object,
        required: true
      }
    }
  }
</script>
