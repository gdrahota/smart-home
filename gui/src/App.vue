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
        isLoggedIn: 'client/userIsLoggedIn'
      })
    },

    created () {
      EventBus.$emit('reLogin')
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
