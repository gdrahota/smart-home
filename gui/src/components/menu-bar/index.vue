<template>
  <v-list dense>
    <template v-for="item in items">

      <v-list-tile
        v-if="!item.children || item.children.length === 0"
        :key="item.text"
        :to="item.to"
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
        v-else
        v-model="item.model"
        :key="item.text"
        :append-icon="item.model ? 'fa-angle-left' : 'fa-angle-right'"
        :prepend-icon="item.icon"
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title v-if="item.to" :to="item.to">
              <span class="subheading">{{ item.text }}</span>
            </v-list-tile-title>
            <v-list-tile-title v-else>
              <span class="subheading">{{ item.text }}</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="(child, i) in item.children"
          :key="i"
          @click=""
          :to="child.to"
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
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>

    </template>
  </v-list>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { icon: 'fa-home', text: 'Home', to: { path: '/' } },
          {
            icon: 'fa-cog',
            text: 'Einstellungen',
            model: false,
            children: [
              { icon: '' +
                  'fa-add', text: 'Gebäude', to: { path: '/admin/facilities' } },
              { icon: 'fa-add', text: 'Schnittstellensysteme', to: { path: '/admin/control-systems' } },
              { icon: 'fa-add', text: 'Endpunkte', to: { path: '/admin/data-points' } },
              { icon: 'fa-add', text: 'Steuerelemente', to: { path: '/admin/controls' } },
              { icon: 'fa-add', text: 'Zeitsteuerung', to: { path: '/admin/schedules' } },
            ]
          },
          {
            icon: 'fa-wrench',
            text: 'Werkzeug',
            model: false,
            children: [
              { icon: 'fa-add', text: 'KNX-Monitor', to: { path: '/tools/knx-monitor' } },
            ]
          },
          { icon: 'fa-dot-circle-o', text: 'Steuerung', to: { path: '/control' } },
        ]
      }
    }
  }
</script>
