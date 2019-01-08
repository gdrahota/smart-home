<template>
  <v-card-title>
    <v-icon class="header-icon" color="yellow">{{ leftIcon }}</v-icon>
    <span class="header-label">{{ label }}</span>
    <v-icon v-if="color" class="header-indicator float-right" :color="color">{{ rightIcon }}</v-icon>
  </v-card-title>
</template>

<script>
  export default {
    props: {
      leftIcon: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      rightIcon: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
  .v-card__title {
    background-color: darkseagreen;
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
    position: relative;
    width: calc(100% - 60px);
  }

  .header-indicator {
    float: right;
    position: relative;
    width: 30px;
  }
</style>
