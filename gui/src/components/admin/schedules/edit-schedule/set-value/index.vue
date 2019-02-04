<template>
  <component
    :is="component"
    :endpoint="endpoint"
    :value="value"
    :defaultValueName="defaultValueName"
    @setValue="v => $emit('setValue', v)"
  />
</template>

<script>
  import ControlSlider from './slider'
  import ControlSwitch from './switch'

  export default {
    components: {
      ControlSwitch,
      ControlSlider,
    },

    computed: {
      component: {
        get () {
          switch (this.endpoint.controlType) {
            case 'slider':
              return ControlSlider
            case 'switch':
              return ControlSwitch
            default:
              console.log('nix gefunden für ' + this.endpoint.controlType)
          }
        }
      }
    },

    props: {
      endpoint: {
        type: Object,
        required: true
      },
      value: {
        type: Boolean | Number,
        required: false,
      },
      defaultValueName: {
        type: String,
        required: true,
      }
    }
  }
</script>
