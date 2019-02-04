<template>
  <v-switch
    v-model="newValue"
    @change="v => $emit('setValue', v)"
    :label="getValueText()"
  ></v-switch>
</template>

<script>
  export default {
    computed: {
      newValue: {
        get () {
          return this.value
        },
        set () {}
      }
    },

    created () {
      if (this.value === null) {
        this.$emit('setValue', this.endpoint[this.defaultValueName])
      }
    },

    methods: {
      getValueText () {
        if (this.newValue === true) {
          return this.endpoint.trueLabel
        }
        return this.endpoint.falseLabel
      }
    },

    props: {
      endpoint: {
        type: Object,
        required: true
      },
      value: {
        type: Boolean,
        default: false
      },
      defaultValueName: {
        type: String,
        required: true,
      },
    }
  }
</script>

<style scoped>
  .v-input {
    margin-top: 5px;
  }
</style>
