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
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">SmartHome</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="fa-search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>fa-calendar</v-icon>
      </v-btn>
      <v-btn icon>
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
  import { mapActions } from 'vuex'
  import PageHeader from './components/main/page-header'
  import MenuBar from './components/menu-bar'

  export default {
    components: {
      PageHeader,
      MenuBar
    },

    created () {
      this.login()
    },

    data: () => ({
      dialog: false,
      drawer: null
    }),

    methods: {
      ...mapActions({
        login: 'client/loginAction',
      })
    },

    props: {
      source: String
    }
  }
</script>
