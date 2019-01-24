<template>
  <v-layout wrap>
    <v-flex xs2>
      <v-list>
        <v-list-tile>
          <div class="subheading">Auswahl:</div>
        </v-list-tile>
        <v-list-tile-content>
          <v-treeview
            :items="items"
            item-key="id"
            multiple-active
            open-on-click
          >
            <template slot="label" slot-scope="{ item, leaf }">
              <router-link
                v-if="leaf"
                :to="{ path: item.path }"
              >{{ item.name }}
              </router-link>
              <div v-else class="">{{ item.name }}</div>
            </template>
          </v-treeview>
        </v-list-tile-content>
      </v-list>
    </v-flex>

    <v-flex xs10 class="pl-3">
      <router-view></router-view>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        getByType: 'externalDataSources/getByType',
      }),
      items: {
        get () {
          return [
            {
              name: 'OpenWeatherMap',
              children: this.getByType('openWeatherMap').map(i => {
                return {
                  name: i.name,
                  path: '/admin/external-data-sources/open-weather-map/' + i._id + '/' + i.name.replace(/\s+/g, '-'),
                }
              })
            }
          ]
        }
      }
    },

    data () {
      return {}
    }
  }
</script>

<style scoped>
  .router-link-active {
    color: darkcyan;
    font-weight: bold;
    text-decoration-line: none;
  }
</style>
