<template>
  <v-layout row>
    <v-flex xs12>
      <v-switch
        v-model="newValue"
        @change="v => $emit('setValue', v)"
        :label="getValueText()"
      />
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        newValue: this.value
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
      }
    }
  }
</script>
