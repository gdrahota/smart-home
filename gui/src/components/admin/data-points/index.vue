<template>
  <div>
    <v-card class="mb-3">
      <v-card-title>
        <div class="subheading">
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
            @click="addDataPointToCurrentControlSystem"
            class="elevation-2"
            fab small
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
      addDataPointToCurrentControlSystem () {
        const newDataPoint = {
          address: '0/0/0',
          description: '',
          controlSystem: this.selectedControlSystemId,
          dataType: '1.001'
        }
        this.add(newDataPoint)
      }
    }
  }
</script>

<style scoped>
  .body-2 > div.flex {
    padding: 5px;
  }
</style>
