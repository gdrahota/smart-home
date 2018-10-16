<template>
  <component
    v-bind:is="currentComponent"
    :control="control"
  />
</template>

<script>
  import { mapGetters } from 'vuex'
  import KnxTpLightSwitch from './knx-tp-light-switch'
  import KnxTpLightDimmer from './knx-tp-light-dimmer'

  export default {
    components: {
      KnxTpLightSwitch
    },

    computed: {
      ...mapGetters({
        control: 'controls/selected',
        dataPoints: 'dataPoints/get'
      }),
      currentComponent () {
        switch (this.control.controlType) {
          case 'lightDimmer':
            return KnxTpLightDimmer
          case 'lightSwitch':
            return KnxTpLightSwitch
          default:
            return KnxTpLightSwitch
        }
      }
    }
  }
</script>
