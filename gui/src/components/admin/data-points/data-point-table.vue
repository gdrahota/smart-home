<template>
  <v-card-text v-if="controlSystemId">
    <!--<search-->
    <!--@searchInDescription="value => { this.searchInDescription = value }"-->
    <!--@searchForDataType="value => { this.searchForDataType = value }"-->
    <!--@searchInUpperRange="value => { this.searchInUpperRange = value }"-->
    <!--@searchInMiddleRange="value => { this.searchInMiddleRange = value }"-->
    <!--/>-->

    <v-data-table
      v-if="controlSystemId"
      :items="sortedItems"
      :headers="headers"
      :custom-filter="filterDataPoints"
      item-key="_id"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td>
            <v-btn
              icon
              small
              @click=""
            >
              <v-icon color="primary" small>fa-edit</v-icon>
            </v-btn>
          </td>
          <td>{{ props.item.address }}</td>
          <td>{{ props.item.dataType }}</td>
          <td>{{ props.item.value }}</td>
          <td>{{ props.item.description }}</td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <data-point-form
          :item="props.item"
          :controlSystem="controlSystemId"
        />
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Search from './search'
  import DataPointForm from './data-point-form'

  export default {
    components: {
      DataPointForm,
      Search
    },

    computed: {
      ...mapGetters({
        dataPoints: 'dataPoints/getByControlSystemId'
      }),
      sortedItems () {
        return this.dataPoints(this.controlSystemId)
      }
    },

    data () {
      return {
        searchInDescription: '',
        searchForDataType: null,
        searchInUpperRange: null,
        searchInMiddleRange: null,
        headers: [
          { text: '', value: '_id', sortable: false },
          { text: 'Gruppenadresse', value: 'address' },
          { text: 'Datenpunkttyp (DPT)', value: 'dataType' },
          { text: 'Aktueller Wert', value: 'value' },
          { text: 'Beschreibung', value: 'description' },
        ]
      }
    },

    methods: {
      filterDataPoints (items, search, filter) {
        const byDescription = row => filter(row['description'], search)
        const byDataType = row => this.searchForDataType ? filter(row['dataType'], this.searchForDataType) : true
        const byAddressRange = row => {
          const parts = row.address.toString().split('/')

          if (parts.length !== 3) {
            return true
          }

          if (this.searchInUpperRange) {
            if (parts[0] !== this.searchInUpperRange) {
              return false
            }
          }

          if (this.searchInMiddleRange) {
            if (parts[1] !== this.searchInMiddleRange) {
              return false
            }
          }

          return true
        }

        return items
          .filter(byDescription)
          .filter(byDataType)
          .filter(byAddressRange)
      }
    },

    props: {
      controlSystemId: {
        type: String,
        default: 'wertzuio'
      }
    }
  }
</script>
