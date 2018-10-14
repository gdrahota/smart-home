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
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-group
        v-else
        v-model="item.model"
        :key="item.text"
        :prepend-icon="item.model ? item.icon : item['icon-alt']"
        append-icon=""
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title v-if="item.to" :to="item.to">{{ item.text }} 11</v-list-tile-title>
            <v-list-tile-title v-else>{{ item.text }} 22</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="(child, i) in item.children"
          :key="i"
          @click=""
          :to="child.to"
        >
          <v-list-tile-action v-if="child.icon">
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ child.text }}
            </v-list-tile-title>
          </v-list-tile-content>
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
          { icon: '', text: 'Räume' },
          {
            icon: 'fa-angle-left', 'icon-alt': 'fa-angle-right',
            text: 'Einstellungen',
            model: true,
            children: [
              { icon: 'fa-building', text: 'Gebäude', to: { path: '/admin/facilities' } },
              { icon: 'fa-cubes', text: 'Steuerelemente', to: { path: '/admin/controls' } }
            ]
          }
        ]
      }
    }
  }
</script>
