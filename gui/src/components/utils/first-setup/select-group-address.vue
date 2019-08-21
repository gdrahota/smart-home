<template>
  <tr>
    <td class="check">
      <v-checkbox
        hide-details
        v-model="groupAddress.selected"
      ></v-checkbox>
    </td>
    <td v-text="groupAddress.address"></td>
    <td v-text="groupAddress.name"></td>
    <template v-if="groupAddress.dataPointType">
      <td>
        <v-select
          :items="dataPointTypes"
          hide-details
          item-text="label"
          item-value="value"
          solo
          v-model="groupAddress.dataPointType"
        ></v-select>
      </td>
    </template>
  </tr>

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        getGroupAddress: 'fileUploads/getGroupAddressByAddress',
        dataPointTypes: 'dataPoints/dataPointTypes',
      }),
      groupAddress () {
        return this.getGroupAddress(this.address)
      },
    },

    props: {
      address: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
  td:not(.check) {
    padding: 10px;
  }

  .check > * {
    position: relative;
    top: -5px;
  }

  .check {
    padding: 0 10px 10px 20px;
  }

  td {
    border-bottom: 1px solid #ddd;
  }
</style>
