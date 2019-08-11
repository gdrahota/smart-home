<template>
  <div>
    <div class="subheading">
      <span>Gebäude</span>
      <knx-ip-interface/>
    </div>

    <v-data-table
      :headers="headers"
      :items="controlSystems"
      :pagination.sync="pagination"
      :rows-per-page-items="rowsPerPageItems"
      item-key="_id"
      no-data-text="Kein KNX-IP-Interface"
      rows-per-page-text=""
    >
      <template slot="items" slot-scope="{ item }">
        <td>
          <v-checkbox
            :value="item._id"
            hide-details
            v-model="selected"
          />
        </td>
        <td>{{ item.name }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.host }}</td>
        <td>{{ item.port }}</td>
      </template>
    </v-data-table>

    <v-divider></v-divider>

    <div class="pt-3">
      <v-btn
        :disabled="!selected"
        @click="moveToNextStep"
        class="right"
        color="primary"
      >
        Weiter
      </v-btn>
      <v-btn
        class="right"
        color="error"
        flat
      >
        Abbrechen
      </v-btn>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import KnxIpInterface from './add-knx-ip-interface'

  export default {
    components: {
      KnxIpInterface,
    },

    computed: {
      ...mapGetters({
        controlSystems: 'controlSystems/get'
      })
    },

    data () {
      return {
        selected: null,
        pagination: {
          rowsPerPage: -1,
          sortBy: 'postCode',
          descending: false
        },
        rowsPerPageItems: [
          { text: '10 pro Seite', value: 10 },
          { text: '20 pro Seite', value: 20 },
          { text: 'Alle', value: -1 },
        ],
        headers: [
          { value: '_id', text: 'Auswahl', sortable: false },
          { value: 'name', text: 'Name' },
          { value: 'description', text: 'Beschreibung' },
          { value: 'type', text: 'Type' },
          { value: 'host', text: 'Host-Name / IP-Adresse' },
          { value: 'port', text: 'Port' },
        ]
      }
    },

    methods: {
      moveToNextStep () {
        this.$emit('setKnxIpInterface', this.selected)
      }
    }
  }
</script>
