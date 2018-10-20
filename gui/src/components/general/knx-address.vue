<template>
  <v-layout wrap row>
    <v-flex xs4>
      <v-text-field
        v-model="upper"
        type="Number"
        :min="0"
        :max="31"
        :disabled="disabled"
        @input="val => setValue('upper', val)"
        :class="{ 'pr-1': true, error: !isFreeAddress }"
        solo
        flat
        hide-details
      ></v-text-field>
    </v-flex>
    <v-flex xs4>
      <v-text-field
        v-model="middle"
        type="Number"
        :min="0"
        :max="7"
        :disabled="disabled"
        @input="val => setValue('middle', val)"
        :class="{ 'pr-1': true, error: !isFreeAddress }"
        solo
        flat
        hide-details
      ></v-text-field>
    </v-flex>
    <v-flex xs4>
      <v-text-field
        v-model="lower"
        type="Number"
        :min="0"
        :max="255"
        :disabled="disabled"
        :class="{ error: !isFreeAddress }"
        @input="val => setValue('lower', val)"
        solo
        flat
        hide-details
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        isAddressAlreadyUsed: 'dataPoints/isAddressAlreadyUsed'
      }),
      upper: {
        get () {
          return Math.floor(parseInt(this.address) / 2048)
        },
        set () {}
      },
      middle: {
        get () {
          return Math.floor((parseInt(this.address) - this.upper * 2048) / 256)
        },
        set () {}
      },
      lower: {
        get () {
          return parseInt(this.address) - this.upper * 2048 - this.middle * 256
        },
        set () {}
      }
    },

    data () {
      return {
        isFreeAddress: true
      }
    },

    methods: {
      setValue (attrName, value) {
        if (!value) {
          return
        }

        value = parseInt(value)

        let response
        switch (attrName) {
          case 'upper':
            response = value * 2048 + this.middle * 256 + this.lower
            break
          case 'middle':
            response = this.upper * 2048 + value * 256 + this.lower
            break
          case 'lower':
            response = this.upper * 2048 + this.middle * 256 + value
            break
        }

        if (!this.isAddressAlreadyUsed(this.controlSystem, response)) {
          this.isFreeAddress = true
          this.$emit('setValue', response)
        } else {
          this.isFreeAddress = false
        }
      }
    },

    props: {
      address: {
        type: Number,
        default: 1
      },
      disabled: {
        type: Boolean,
        default: true
      },
      controlSystem: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
  .error {
    background-color: orange;
  }
</style>
