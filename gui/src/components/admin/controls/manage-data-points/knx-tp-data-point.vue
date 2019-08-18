<template>
  <div>
    <v-combobox
      :hint="hint"
      :items="dataPointsWithUsage"
      :label="label"
      autocomplete="false"
      clearable
      item-text="label"
      return-object
      v-model="value"
    >
      <template slot="item" slot-scope="{ item }">
        <v-card-title :class="{ 'is-in-use': item.isInUse }">{{ item.label }}</v-card-title>
      </template>
    </v-combobox>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { sortByLabel } from '../../../../sorters'

  export default {
    computed: {
      ...mapGetters({
        dataPoints: 'dataPoints/get',
        controlDataPointByControlAndEndPoint: 'controlDataPoints/getByControlAndEndPoint',
        dataPointsOfControlSystem: 'dataPoints/getByControlSystemId',
        getControlDataPoints: 'controlDataPoints/get',
        getShowOnlyUnusedDataPoints: 'dataPoints/getShowOnlyUnusedDataPoints',
      }),
      value: {
        get () {
          const controlDataPoint = this.controlDataPointByControlAndEndPoint(this.control._id, this.endPoint)
          if (controlDataPoint) {
            return this.list.find(dp => dp.value === controlDataPoint.dataPoint)
          }
        },
        set (newValue) {
          if (newValue === undefined) {
            const payload = {
              control: this.control._id,
              endPoint: this.endPoint
            }
            this.remove(payload)
            console.log('remove', payload)
          } else {
            const payload = {
              control: this.control._id,
              endPoint: this.endPoint,
              dataPoint: newValue.value
            }
            console.log('upsert', payload)
            this.upsert(payload)
          }
        }
      },
      dataPointsWithUsage () {
        const addUsageFn = dataPoint => {
          let isInUse = false
          if (this.value && this.value.value === dataPoint._id) {
            isInUse = false
          } else {
            isInUse = this.getControlDataPoints.findIndex(cdp => cdp.dataPoint === dataPoint._id) !== -1
          }

          return {
            ...dataPoint,
            isInUse
          }
        }

        const filterUnUsed = dataPoint => {
          if (!this.getShowOnlyUnusedDataPoints) {
            return true
          }

          let isInUse = false
          if (this.value && this.value.value === dataPoint._id) {
            return true
          } else {
            return this.getControlDataPoints.findIndex(cdp => cdp.dataPoint === dataPoint._id) === -1
          }

          return {
            ...dataPoint,
            isInUse
          }
        }

        const mapData = dp => {
          return {
            label: dp.address + ' : ' + dp.description,
            value: dp._id,
            isInUse: dp.isInUse
          }
        }

        return this.dataPoints
          .filter(filterUnUsed)
          .map(addUsageFn)
          .filter(dp => dp.dataType === this.dataType)
          .map(mapData)
          .sort(sortByLabel)
      },
      list () {
        const mapData = dp => {
          return {
            label: dp.address + ' : ' + dp.description,
            value: dp._id
          }
        }

        return this
          .dataPoints
          .filter(dp => dp.dataType === this.dataType)
          .map(mapData)
          .sort(sortByLabel)
      },
    },

    methods: {
      ...mapActions({
        upsert: 'controlDataPoints/upsertAction',
        remove: 'controlDataPoints/removeAction'
      }),
    },

    props: {
      label: {
        type: String,
        required: true
      },
      hint: {
        type: String,
        default: ''
      },
      endPoint: {
        type: String,
        required: true
      },
      dataType: {
        type: String,
        required: true
      },
      control: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style>
  .is-in-use {
    opacity: 0.5;
  }

  .v-list__tile--active {
    font-weight: bold;
    font-size: 20px;
  }
</style>
