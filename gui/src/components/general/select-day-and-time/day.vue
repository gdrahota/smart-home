<template>
  <v-layout wrap row ref="time-slot-view">
    <v-flex xs1 class="text-xs-right pr-3">{{ day.text }}</v-flex>
    <v-flex xs5>
      <v-layout wrap row>
        <v-flex
          xs1
          v-for="n in 12"
          :key="day.value + '.' + n"
          class="border"
        >
          <hour :day="day.value" :hour="(n - 1)"/>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs5 last>
      <v-layout wrap row>
        <v-flex
          xs1
          v-for="n in 12"
          :key="day.value + '.' + (n + 12)"
          class="border"
        >
          <hour :day="day.value" :hour="(n + 11)"/>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs1></v-flex>
  </v-layout>
</template>

<script>
  import Hour from './hour'

  export default {
    components: {
      Hour,
    },

    props: {
      day: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
  .border {
    border-left: 1px solid #888;
  }

  .xs5.last > .layout > .border:last-child {
    border-right: 1px solid #888;
  }
</style>
