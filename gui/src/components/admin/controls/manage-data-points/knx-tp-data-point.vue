<template>
  <v-select
    v-model="value"
    :items="list"
    :label="label"
    :hint="hint"
    item-text="label"
    item-value="value"
    clearable
    :return-object="false"
  />
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        dataPoints: 'dataPoints/get',
        controlDataPointByControlAndEndPoint: 'controlDataPoints/getByControlAndEndPoint'
      }),
      list () {
        const mapData = dp => {
          return {
            label: dp.address + ' :: ' + dp.description,
            value: dp._id
          }
        }
        return this.dataPoints
          .filter(dp => dp.dataType === this.dataType)
          .map(mapData)
      },
      value: {
        get () {
          const controlDataPoint = this.controlDataPointByControlAndEndPoint(this.control._id, this.endPoint)
          if (controlDataPoint) {
            return controlDataPoint.dataPoint
          }
          return null
        },
        set (newValue) {
          if (!newValue) {
            this.remove({
              control: this.control._id,
              endPoint: this.endPoint
            })
          } else {
            const controlDataPoint = {
              control: this.control._id,
              endPoint: this.endPoint,
              dataPoint: newValue
            }
            this.upsert(controlDataPoint)
          }
        }
      }
    },

    methods: {
      ...mapActions({
        upsert: 'controlDataPoints/upsertAction',
        remove: 'controlDataPoints/removeAction'
      })
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
