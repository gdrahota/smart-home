<template>
  <div>
    <v-text-field
      label="Suche"
      v-model="searchStr"
    />
    <v-data-table
      :items="items"
      :headers="headers"
      :pagination.sync="pagination"
      :search="searchStr"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.address }}</td>
        <td class="text-xs-right">{{ props.item.rawValue }}</td>
        <td class="text-xs-right">{{ props.item.eventType }}</td>
        <td class="text-xs-right">{{ props.item.timestamp }}</td>
      </template>
    </v-data-table>
  </div>
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
          rowsPerPage: -1
        },
        headers: [
          { text: 'address', value: 'address' },
          { text: 'rawValue', value: 'rawValue' },
          { text: 'eventType', value: 'eventType' },
          { text: 'timestamp', value: 'timestamp' },
        ]
      }
    }
  }
</script>
