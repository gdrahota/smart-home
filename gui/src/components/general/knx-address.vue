<template>
  <v-layout wrap row>
    <v-flex xs4>
      <v-text-field
        label="KNX 1"
        v-model="upper"
        type="Number"
        :min="0"
        :max="31"
        @input="val => setValue('upper', val)"
        :class="{ 'pr-1': true, error: !isFreeAddress }"
        hide-details
      ></v-text-field>
    </v-flex>
    <v-flex xs4>
      <v-text-field
        label="KNX 2"
        v-model="middle"
        type="Number"
        :min="0"
        :max="7"
        @input="val => setValue('middle', val)"
        :class="{ 'pr-1': true, error: !isFreeAddress }"
        hide-details
      ></v-text-field>
    </v-flex>
    <v-flex xs4>
      <v-text-field
        label="KNX 3"
        v-model="lower"
        type="Number"
        :min="0"
        :max="255"
        :class="{ error: !isFreeAddress }"
        @input="val => setValue('lower', val)"
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
          const parts = this.address.toString().split('/')
          return parseInt(parts[0])
        },
        set () {}
      },
      middle: {
        get () {
          const parts = this.address.toString().split('/')
          return parts.length >= 2 ? parseInt(parts[1]) : 31
        },
        set () {}
      },
      lower: {
        get () {
          const parts = this.address.toString().split('/')
          return parts.length === 3 ? parseInt(parts[2]) : 255
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
            response = value.toString() + '/' + this.middle + '/' + this.lower
            break
          case 'middle':
            response = this.upper + '/' + value.toString() + '/' + this.lower
            break
          case 'lower':
            response = this.upper + '/' + this.middle + '/' + value.toString()
            break
        }

        //if (!this.isAddressAlreadyUsed(this.controlSystem, response)) {
        this.isFreeAddress = true
        this.$emit('setValue', response)
        //} else {
        //  this.isFreeAddress = false
        //}
      }
    },

    props: {
      address: {
        type: String,
        default: 1
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
