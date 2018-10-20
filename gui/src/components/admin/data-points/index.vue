<template>
  <div>
    <v-card class="mb-3">
      <v-card-title>
        <div class="subheading">
          <v-btn
            @click.stop="disabled = !disabled"
            class="float-left"
            :style="{ left: '-10px', top: '5px' }"
            icon
            :disabled="!selectedControlSystemId"
          >
            <v-icon v-if="disabled">fa-lock</v-icon>
            <v-icon v-else>fa-unlock</v-icon>
          </v-btn>
          <v-select
            :items="controlSystems"
            v-model="selectedControlSystemId"
            item-text="name"
            item-value="_id"
            label="Steuerung"
            clearable
            class="float-left"
          ></v-select>
          <v-btn
            v-if="selectedControlSystemId"
            fab
            small
            @click="showAddForm = true"
            class="elevation-2"
          >
            <v-icon small color="green darken-1">fa-plus</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <v-card-text v-if="selectedControlSystemId">
          <search
            @searchInDescription="value => { searchInDescription = value }"
            @searchForDataType="value => { searchForDataType = value }"
            @searchInUpperRange="value => { searchInUpperRange = value }"
            @searchInUMiddleRange="value => { searchInUMiddleRange = value }"
          />
        </v-card-text>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-text v-if="selectedControlSystemId">
        <v-layout wrap row class="body-2">
          <v-flex xs2>Gruppenadresse</v-flex>
          <v-flex xs3>Beschreibung</v-flex>
          <v-flex xs3>Datentyp</v-flex>
          <v-flex xs4>Verwendung</v-flex>
        </v-layout>

        <v-data-iterator
          v-if="selectedControlSystemId"
          :items="dataPoints(selectedControlSystemId)"
          :pagination.sync="pagination"
          :custom-filter="filterDataPoints"
          :search="searchInDescription"
          hide-actions
        >
          <template slot="item" slot-scope="props">
            <data-point-form
              :item="props.item"
              :disabled="disabled"
              :controlSystem="selectedControlSystemId"
            />
          </template>
        </v-data-iterator>

        <add-data-point-form
          v-if="showAddForm"
          :controlSystem="selectedControlSystemId"
          @cancel="() => { showAddForm = false }"
        />

      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import DataPointForm from './data-point-form'
  import AddDataPointForm from './add-data-point-form'
  import Search from './search'

  export default {
    components: {
      AddDataPointForm,
      DataPointForm,
      Search
    },

    computed: {
      ...mapGetters({
        controlSystems: 'controlSystems/get',
        dataPoints: 'dataPoints/getByControlSystemId'
      })
    },

    data () {
      return {
        searchInDescription: '',
        searchForDataType: null,
        searchInUpperRange: null,
        searchInUMiddleRange: null,
        selectedControlSystemId: null,
        disabled: true,
        showAddForm: false,
        pagination: {
          rowsPerPage: -1,
          sortBy: 'address'
        }
      }
    },

    methods: {
      ...mapActions({
        add: 'dataPoints/addAction'
      }),
      filterDataPoints (items, search, filter) {
        const byDescription = row => filter(row['description'], search)
        const byDataType = row => this.searchForDataType ? filter(row['dataType'], this.searchForDataType) : true
        const byAddressRange = row => {
          if (this.searchInUpperRange === null && this.searchInUMiddleRange === null) {
            return true
          }

          let min = this.searchInUpperRange ? this.searchInUpperRange * 2048 : 0
          let max = this.searchInUpperRange ? this.searchInUpperRange * 2048 + 2047 : 0

          min = this.searchInUMiddleRange ? min + this.searchInUMiddleRange * 32 : min
          max = this.searchInUMiddleRange ? max + this.searchInUMiddleRange * 32 + 31 : max

          return row.address >= min && row.address <= max
        }

        return items
          .filter(byDescription)
          .filter(byDataType)
          .filter(byAddressRange)
      }
    }
  }
</script>

<style scoped>
  .body-2 > div.flex {
    padding: 5px;
  }
</style>
