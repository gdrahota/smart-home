<template>
  <v-card-title>
    <v-icon class="header-icon" :color="leftIconColor">{{ leftIcon }}</v-icon>
    <span class="header-label">{{ label }}</span>
    <control-endpoint-values :control="control"/>
  </v-card-title>
</template>

<script>
  import ControlEndpointValues from './control-endpoint-values'

  export default {
    components: {
      ControlEndpointValues,
    },

    props: {
      control: {
        type: Object,
        required: true,
      },
      leftIcon: {
        type: String,
        default: ''
      },
      leftIconColor: {
        type: String,
        default: '#fff'
      },
      label: {
        type: String,
        default: ''
      },
    }
  }
</script>

<style scoped>
  .v-card__title {
    background-color: #ddd;
    padding-right: 5px;
    padding-left: 5px;
    padding-top: 0px;
    font-weight: 800;
    height: 40px;
  }

  .v-card__title > i {
    float: right;
  }

  .header-icon {
    float: left;
    position: relative;
    width: 30px;
  }

  .header-label {
    color: #444;
    float: left;
    font-size: 16px;
    font-weight: normal;
    padding-left: 3px;
    position: relative;
    overflow-x: hidden;
    text-overflow: ellipsis;
    top: 2px;
    width: calc(100% - 75px);
    white-space: nowrap;
  }

  .header-indicator {
    float: right;
    position: relative;
    width: 30px;
  }
</style>
