<template>
  <!--<pre>{{currentComponent}}</pre>-->
  <component
    v-if="control"
    :is="currentComponent"
    :control="control"
  />
</template>

<script>
  import { mapGetters } from 'vuex'
  import KnxTpLightSwitch from './knx-tp-light-switch'
  import KnxTpLightDimmer from './knx-tp-light-dimmer'

  export default {
    components: {
      KnxTpLightSwitch,
      KnxTpLightDimmer
    },

    computed: {
      ...mapGetters({
        dataPoints: 'dataPoints/get'
      }),
      currentComponent () {
        console.log('???', this.control)
        switch (this.control.controlType) {
          case 'lightDimmer':
            console.log('lightDimmer')
            return KnxTpLightDimmer
          case 'lightSwitch':
            console.log('lightSwitch')
            return KnxTpLightSwitch
          default:
            console.log('default')
            return KnxTpLightSwitch
        }
      }
    },

    props: {
      control: {
        type: Object,
        default: null
      }
    }
  }
</script>
