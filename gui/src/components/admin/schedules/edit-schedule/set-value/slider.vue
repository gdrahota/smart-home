<template>
  <v-layout row>
    <v-flex xs10>
      <v-slider
        v-model="newValue"
        :min="0"
        :max="100"
        :step="10"
        @change="v => $emit('setValue', v)"
      ></v-slider>
    </v-flex>
    <v-flex xs2 class="pt-4">{{ newValue }} %</v-flex>
  </v-layout>
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

    props: {
      value: {
        type: Number,
        default: 0
      }
    }
  }
</script>
