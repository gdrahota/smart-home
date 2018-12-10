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

      <data-point-table :controlSystemId="selectedControlSystemId"/>

    </v-card>

    <v-card>
      <v-card-text v-if="selectedControlSystemId">

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
  import AddDataPointForm from './add-data-point-form'
  import DataPointTable from './data-point-table'

  export default {
    components: {
      AddDataPointForm,
      DataPointTable,
    },

    computed: {
      ...mapGetters({
        controlSystems: 'controlSystems/get',
        dataPoints: 'dataPoints/getByControlSystemId'
      })
    },

    data () {
      return {
        disabled: true,
        showAddForm: false,
        selectedControlSystemId: null
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
    }
  }
</script>

<style scoped>
  .body-2 > div.flex {
    padding: 5px;
  }
</style>
