<template>
  <v-list dense>
    <template v-for="item in items">

      <v-list-tile
        :key="item.text"
        :to="item.to"
        v-if="!item.children || item.children.length === 0"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            <span class="subheading">{{ item.text }}</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-group
        :append-icon="item.model ? 'fa-angle-left' : 'fa-angle-right'"
        :key="item.text"
        :prepend-icon="item.icon"
        v-else-if="grantAccess(item.requiredGroup)"
        v-model="item.model"
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title :to="item.to" v-if="item.to">
              <span class="subheading">{{ item.text }}</span>
            </v-list-tile-title>
            <v-list-tile-title v-else>
              <span class="subheading">{{ item.text }}</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          :key="i"
          :to="child.to"
          @click=""
          v-for="(child, i) in item.children"
        >
          <v-list-tile-action v-if="child.icon">
            <v-icon></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <span class="body-1">{{ child.text }}</span>
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="child.icon">
            <v-icon small>{{ child.icon }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </template>
  </v-list>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        currentUser: 'users/getCurrentUser'
      }),
    },

    data () {
      return {
        items: [
          { icon: 'fa-home', text: 'Home', to: { path: '/' } },
          {
            requiredGroup: 'GlobalAdmin',
            icon: 'fa-cog',
            text: 'Einstellungen',
            model: false,
            children: [
              { icon: 'fa-university', text: 'Gebäude', to: { path: '/admin/facilities' } },
              { icon: 'fa-link', text: 'Schnittstellensysteme', to: { path: '/admin/control-systems' } },
              { icon: 'fa-arrow-circle-o-down', text: 'Endpunkte', to: { path: '/admin/data-points' } },
              { icon: 'fa-dot-circle-o', text: 'Steuerelemente', to: { path: '/admin/controls' } },
              { icon: 'fa-clock-o', text: 'Zeitsteuerung', to: { path: '/admin/schedules' } },
              { icon: 'fa-add', text: 'Externe Datenquellen', to: { path: '/admin/external-data-sources' } },
              { icon: 'fa-users', text: 'Benutzerverwaltung', to: { path: '/admin/users' } },
            ]
          },
          {
            requiredGroup: 'GlobalAdmin',
            icon: 'fa-wrench',
            text: 'Werkzeug',
            model: false,
            children: [
              { icon: 'fa-file-text-o', text: 'KNX-Monitor', to: { path: '/tools/knx-monitor' } },
              { icon: 'fa-cog', text: 'Setup', to: { path: '/tools/first-setup' } },
            ]
          },
          { icon: 'fa-dot-circle-o', text: 'Steuerung', to: { path: '/control' } },
        ]
      }
    },

    methods: {
      grantAccess (requiredGroup) {
        if (!this.currentUser) {
          return false
        }

        if (!requiredGroup || requiredGroup === '') {
          return true
        }

        return this.currentUser.groups.find(group => group === requiredGroup)
      },
    },
  }
</script>
