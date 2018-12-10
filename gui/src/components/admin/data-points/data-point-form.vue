<template>
  <v-layout row wrap class="mt-2">
    <v-flex xs2 class="pr-2">
      <knx-address
        :address="data.address"
        :controlSystem="controlSystem"
        @setValue="event => updateAttribute('address', event)"
      />
    </v-flex>
    <v-flex xs3 class="pr-2">
      <v-select
        v-model="data.dataType"
        :items="dataPointTypes"
        item-text="label"
        item-value="value"
        label="KNX-Datenpunkttyp (DPT)"
        @input="event => updateAttribute('dataType', event)"
      ></v-select>
    </v-flex>
    <v-flex xs6 class="pr-2">
      <v-text-field
        v-model="data.description"
        label="Beschreibung"
        @input="event => updateAttribute('description', event)"
      ></v-text-field>
    </v-flex>
    <v-flex xs1>
      <v-btn icon fab small @click="save">
        <v-icon color="primary" small>fa-save</v-icon>
      </v-btn>
    </v-flex>

    <v-flex xs12>
      <div v-for="used of usedIn" :key="used.key" class="used-in-control elevation-1" :dimmed="disabled">
        <span>{{ used.label }}</span>
        <v-chip v-for="value of used.facilityAttributeValues" :key="value">{{ value }}</v-chip>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import knxDataTypeFilter from '../../../filter/knx-data-type'

  export default {
    computed: {
      ...mapGetters({
        usage: 'controlDataPoints/getUsage',
        getControlById: 'controls/getById',
        getFacilityById: 'facilities/getById',
        facilityAttributeValues: 'facilityAttributeValues/getById',
        dataPointTypes: 'dataPoints/dataPointTypes'
      }),
      address: {
        get () {
          return this.item.address
        },
        set (newValue) {}
      },
      description: {
        get () {
          return this.item.description
        },
        set (newValue) {}
      },
      dataType: {
        get () {
          return this.item.dataType
        },
        set (newValue) {}
      },
      usedIn () {
        return this
          .usage(this.item._id)
          .map(controlDataPoint => {
            const control = this.getControlById(controlDataPoint.control)
            const facility = this.getFacilityById(control.facilityId)
            const address = facility.address
            const facilityAttributeValues
              = control
              .attributeValues.map(facilityAttributeId => this.facilityAttributeValues(facilityAttributeId))
              .map(facilityAttributeValue => facilityAttributeValue.value)
            return {
              key: control._id,
              label: control.name,
              technology: control.technology,
              controlType: control.controlType,
              address: address.postCode + ' ' + address.city + ', ' + address.street,
              facilityAttributeValues
            }
          })
      }
    },

    created () {
      this.data = { ...this.item }
    },

    data () {
      return {
        data: {}
      }
    },

    methods: {
      ...mapActions({
        update: 'dataPoints/updateAction'
      }),
      updateAttribute (attrName, newValue) {
        this.data = { ...this.data, [attrName]: newValue }
      },
      save () {
        this.update(this.data)
      }
    },

    props: {
      item: {
        type: Object,
        required: true
      },
      disabled: {
        type: Boolean,
        default: true
      },
      controlSystem: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
  .used-in-control {
    background-color: #f8f8f8;
    padding: 3px 15px;
  }

  [dimmed] {
    opacity: 0.5;
  }
</style>
