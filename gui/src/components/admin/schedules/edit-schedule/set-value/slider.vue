<template>
  <v-slider
    v-model="newValue"
    :min="endpoint.min"
    :max="endpoint.max"
    :step="endpoint.step"
    @change="v => $emit('setValue', v)"
    hide-details
    inverse-label
    :label="getLabel()"
  ></v-slider>
</template>

<script>
  export default {
    created () {
      if (this.value === null) {
        this.$emit('setValue', this.endpoint[this.defaultValueName])
      }
    },

    computed: {
      newValue: {
        get () {
          return this.value
        },
        set () {}
      }
    },

    methods: {
      getLabel () {
        if (this.endpoint && this.endpoint.unit && this.newValue) {
          return this.newValue.toString() + ' ' + this.endpoint.unit
        }
        if (this.newValue) {
          return this.newValue.toString()
        }
        return ''
      }
    },

    props: {
      endpoint: {
        type: Object,
        required: true
      },
      value: {
        type: Number,
        required: false,
      },
      defaultValueName: {
        type: String,
        required: true,
      },
    }
  }
</script>

<style scoped>
  .v-input--slider {
    margin-top: 5px;
    padding-left: 20px;
  }
</style>
