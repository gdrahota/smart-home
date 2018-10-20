<template>
  <v-layout row wrap class="mb-1">
    <v-flex xs2 class="pr-1">
      <knx-address
        :address="address"
        :disabled="disabled"
        :controlSystem="controlSystem"
        @setValue="event => updateAttribute('address', event)"
      />
    </v-flex>
    <v-flex xs3 class="pr-1">
      <v-text-field
        v-model="description"
        solo
        flat
        hide-details
        class="elevation-1"
        @input="event => updateAttribute('description', event)"
        :disabled="disabled"
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
        @input="event => updateAttribute('dataType', event)"
        :disabled="disabled"
      ></v-select>
    </v-flex>
    <v-flex xs4>
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
        facilityAttributeValues: 'facilityAttributeValues/getById'
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

    data () {
      return {
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
        update: 'dataPoints/updateAction'
      }),
      updateAttribute (attrName, newValue) {
        this.update({ ...this.item, [attrName]: newValue })
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
