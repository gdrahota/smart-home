<template>
  <v-layout row wrap class="mb-3">
    <v-flex xs2 class="pr-1">
      <knx-address
        :address="address"
        :disabled="false"
        :controlSystem="controlSystem"
        @setValue="event => { address = event }"
      />
    </v-flex>
    <v-flex xs3 class="pr-1">
      <v-text-field
        v-model="description"
        solo
        flat
        hide-details
        class="elevation-1"
      ></v-text-field>
    </v-flex>
    <v-flex xs3 class="pr-1">
      <v-select
        v-model="dataType"
        :items="dataTypes"
        item-text="label"
        item-value="value"
        solo
        flat
        hide-details
        class="elevation-1"
      ></v-select>
    </v-flex>
    <v-flex xs4>
      <v-btn fab small class="elevation-2" @click="addDataPoint">
        <v-icon small color="green darken-1">fa-save</v-icon>
      </v-btn>
      <v-btn fab small class="elevation-2" @click="$emit('cancel')">
        <v-icon small color="grey darken-1">fa-times</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import knxDataTypeFilter from '../../../filter/knx-data-type'

  export default {
    computed: {
      ...mapGetters({
        getControlById: 'controls/getById',
        getFacilityById: 'facilities/getById',
        facilityAttributeValues: 'facilityAttributeValues/getById'
      }),
    },

    data () {
      return {
        address: 0,
        description: '',
        dataType: null,
        dataTypes: Array.from(Array(20).keys()).map(i => {
          return {
            label: knxDataTypeFilter(i + 1),
            value: i + 1
          }
        })
      }
    },

    methods: {
      ...mapActions({
        add: 'dataPoints/addAction'
      }),
      addDataPoint () {
        this.add({
          controlSystem: this.controlSystem,
          address: this.address,
          description: this.description,
          dataType: this.dataType
        })

        this.address = this.address + 1
        this.description = ''
        this.dataType = null
      }
    },

    props: {
      controlSystem: {
        type: String,
        required: true
      }
    }
  }
</script>
