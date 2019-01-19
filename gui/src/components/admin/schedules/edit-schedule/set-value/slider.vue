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
    data () {
      return {
        newValue: this.value
      }
    },

    methods: {
      getLabel () {
        if (this.endpoint && this.endpoint.unit) {
          return this.newValue.toString() + ' ' + this.endpoint.unit
        }
        return this.newValue.toString()
      }
    },

    props: {
      endpoint: {
        type: Object,
        required: true
      },
      value: {
        type: Number,
        default: 0
      }
    }
  }
</script>
