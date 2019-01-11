<template>
  <v-card-title>
    <v-icon class="header-icon" :color="leftIconColor">{{ leftIcon }}</v-icon>
    <span class="header-label">{{ label }}</span>
    <v-icon class="header-indicator float-right" :color="rightIconColor">{{ rightIcon }}</v-icon>
  </v-card-title>
</template>

<script>
  export default {
    props: {
      leftIcon: {
        type: String,
        default: ''
      },
      leftIconColor: {
        type: String,
        default: 'white'
      },
      label: {
        type: String,
        default: ''
      },
      rightIcon: {
        type: String,
        default: ''
      },
      rightIconColor: {
        type: String,
        default: 'grey'
      }
    }
  }
</script>

<style scoped>
  .v-card__title {
    background-color: #969595;
    padding-right: 5px;
    padding-left: 5px;
    color: white;
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
    float: left;
    font-size: 16px;
    padding-left: 5px;
    position: relative;
    top: 4px;
    width: calc(100% - 60px);
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .header-indicator {
    float: right;
    position: relative;
    width: 30px;
  }
</style>
