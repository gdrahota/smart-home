<template>
  <v-card>
    <v-card-title>
      <div class="subheading">Angeschlossene Bussysteme</div>
    </v-card-title>
    <v-card-text>
      <v-layout wrap row class="body-2">
        <v-flex xs1></v-flex>
        <v-flex xs2>Bus-Typ</v-flex>
        <v-flex xs2>Name</v-flex>
        <v-flex xs2>Host-Name / IP-Adresse</v-flex>
        <v-flex xs1>Port</v-flex>
        <v-flex xs4>Kommentar</v-flex>
      </v-layout>

      <control-system-form
        v-for="controlSystem of controlSystems"
        :controlSystem="controlSystem"
        :key="controlSystem._id"
      />

      <control-system-form/>

    </v-card-text>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ControlSystemForm from './control-system-form'

  export default {
    components: {
      ControlSystemForm
    },

    computed: {
      ...mapGetters({
        controlSystems: 'controlSystems/get'
      })
    },

    data () {
      return {
      }
    },

    methods: {
      ...mapActions({
        add: 'controlSystems/addAction',
        update: 'controlSystems/updateAction'
      }),
    }
  }
</script>

<style scoped>
  .flex {
    padding: 5px 15px;
  }
</style>
