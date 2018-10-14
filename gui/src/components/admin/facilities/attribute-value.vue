<template>
  <v-text-field
    v-model="value"
  />
</template>

<script>
  export default {
    data () {
      return {
        value: this.attributeValue.name
      }
    },

    props: {
      'attribute-value': {
        type: Object,
        default: () => {}
      }
    },

    watch: {
      attributeValue (value) {
        this.value = value.name
      }
    }
  }
</script>
