<template>
  <div>
    <knx-default-light-switch :control="control" v-if="control.controlType === 'lightSwitch'"/>
    <knx-default-light-dimmer :control="control" v-if="control.controlType === 'lightDimmer'"/>
  </div>
</template>

<script>
  import knxDefaultLightSwitch from './knx-tp/default/light-switch'
  import knxDefaultLightDimmer from './knx-tp/default/light-dimmer'

  export default {
    components: {
      knxDefaultLightSwitch,
      knxDefaultLightDimmer
    },

    props: {
      control: {
        type: Object,
        required: true
      }
    }
  }
</script>
