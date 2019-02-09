<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <menu-bar/>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title style="width: 300px" class="ml-0">SmartHome</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout" icon :disabled="!isLoggedIn">
        <v-icon>fa-sign-out</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content align-start>
      <div class="pl-3 pr-3 pb-3">
        <page-header/>
        <router-view/>
      </div>
    </v-content>
    <v-footer app :class="socketState">
      <v-icon :color="socketStateColor" class="pl-3">fa-plug</v-icon>
      <span class="pl-2 red--text darken-3" v-if="socketState === 'disconnected'">Es besteht derzeit keine Verbindung zum Server!</span>
      <v-spacer/>
      <span class="pr-2">
        Letzte Datenänderung: {{ $moment(latestUpdateDate).fromNow() }}
      </span>
    </v-footer>
    <v-dialog
      v-model="showNoConnectionOverlay"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-layout align-center justify-center row fill-height half-transparent row wrap>
        <v-flex xs12>Die Verbindung zum Server ist unterbrochen.</v-flex>
      </v-layout>
    </v-dialog>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { EventBus } from './event-bus'
  import PageHeader from './components/main/page-header'
  import MenuBar from './components/menu-bar'

  export default {
    components: {
      PageHeader,
      MenuBar
    },

    computed: {
      ...mapGetters({
        isLoggedIn: 'client/userIsLoggedIn',
        socketState: 'client/getSocketState',
        getReLoginFailed: 'client/getReLoginFailed',
        latestUpdateDate: 'controls/getLatestUpdateDate',
      }),
      socketStateColor () {
        if (this.socketState === 'connected') {
          return 'green lighten-0'
        }
        return 'red lighten-1'
      },
      showNoConnectionOverlay: {
        get () {
          return this.socketState !== 'connected'
        },
        set () {}
      }
    },

    data: () => ({
      dialog: false,
      drawer: null
    }),

    methods: {
      logout () {
        EventBus.$emit('logout')
      }
    },

    props: {
      source: String
    }
  }
</script>

<style scoped>
  .disconnected {
    border-top: 2px solid red;
  }

  .connected {
    border-top: 2px solid rgb(12, 179, 12);
  }

  .half-transparent {
    background-color: coral;
    opacity: 0.9;
  }

  .flex {
    background-color: transparent;
    font-size: 30px;
    text-align: center;
  }
</style>
