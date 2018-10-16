<template>
  <v-card>
    <v-card-title>
      <div class="subheading">KNX Gruppenadressen</div>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="dataPoints"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.address }}</td>
          <td>{{ props.item.description }}</td>
          <td>{{ props.item.dataType | knxDataType }}</td>
          <td>{{ props.item.isInUse }}</td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        dataPoints: 'dataPoints/get'
      })
    },

    data () {
      return {
        headers: [
          { text: 'Gruppenadresse', value: 'address' },
          { text: 'Beschreibung', value: 'description' },
          { text: 'Datentyp', value: 'dataType' },
          { text: 'In Verwendung', value: 'isInUse' }
        ]
      }
    }
  }
</script>
