<template>
  <v-layout wrap row>
    <v-flex xs6 md3>
      <v-text-field
        label="Einträge filtern..."
        v-model="searchStr"
        box
      />
    </v-flex>
    <v-flex xs12>
      <v-data-table
        :items="items"
        :headers="headers"
        :pagination.sync="pagination"
        :search="searchStr"
        :rows-per-page-items="[5,10,15,{'text':'$vuetify.dataIterator.rowsPerPageAll','value':-1}]"
        rows-per-page-text="Einträge pro Seite"
        :no-results-text="'Es wurde kein Eintrag mit dem Filter > ' + searchStr + ' < gefunden'"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ $moment(props.item.timestamp).format('DD.MM.YY - HH:mm:ss') }}</td>
          <td class="text-xs-left">{{ props.item.address }}</td>
          <td class="text-xs-left">
            <span v-if="props.item.eventType === 'GroupValue_Write'">Befehl</span>
            <span v-else-if="props.item.eventType === 'GroupValue_Read'">Leseanforderung</span>
            <span v-else-if="props.item.eventType === 'GroupValue_Response'">Bestätigung</span>
            <span v-else>{{props.item.eventType }}</span>
          </td>
          <td class="text-xs-left" style="width: 70%">{{ props.item.rawValue }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        items: 'knxEvents/get'
      })
    },

    data () {
      return {
        searchStr: '',
        pagination: {
          rowsPerPage: 15,
          sortBy: 'timestamp',
          descending: false,
        },
        headers: [
          { text: 'Zeitpunkt', value: 'timestamp' },
          { text: 'Gruppenadresse', value: 'address' },
          { text: 'Telegrammtyp', value: 'eventType' },
          { text: 'Wert', value: 'rawValue' },
        ]
      }
    }
  }
</script>
