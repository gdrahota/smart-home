<template>
  <div>
    <div class="subheading">
      <span>Gebäude</span>
      <add-facility-form/>
    </div>

    <v-data-table
      :headers="headers"
      :items="facilities"
      :pagination.sync="pagination"
      :rows-per-page-items="rowsPerPageItems"
      item-key="_id"
      no-data-text="Noch keine Gebäude angelegt"
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
        <td>{{ item.postCode }}</td>
        <td>{{ item.city }}</td>
        <td>{{ item.street }}</td>
        <td>{{ item.state }}</td>
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
  import AddFacilityForm from '../../admin/facilities/add-facility-form'

  export default {
    components: {
      AddFacilityForm,
    },

    computed: {
      ...mapGetters({
        getFacilities: 'facilities/get'
      }),
      facilities () {
        return this.getFacilities
          .map(f => {
            return {
              _id: f._id,
              street: f.address.street,
              postCode: f.address.postCode,
              city: f.address.city,
              state: f.state,
            }
          })
      }
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
          { text: '10 Gebäude pro Seite', value: 10 },
          { text: '20 Gebäude pro Seite', value: 20 },
          { text: 'Alle Gebäude', value: -1 },
        ],
        headers: [
          { value: '_id', text: 'Auswahl', sortable: false },
          { value: 'postCode', text: 'Postleitzahl' },
          { value: 'city', text: 'Ort' },
          { value: 'street', text: 'Straße' },
          { value: 'state', text: 'Status' },
        ]
      }
    },

    methods: {
      moveToNextStep () {
        this.$emit('setFacility', this.selected)
      }
    }
  }
</script>

<style scoped>
</style>
