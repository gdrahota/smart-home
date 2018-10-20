<template>
  <v-layout wrap row>
    <v-flex xs2>
      <v-layout wrap row>
        <v-flex xs6>
          <v-select
            :items="upperRange"
            v-model="upper"
            label="1. Teil"
            class="pr-1"
            hide-details
            clearable
          ></v-select>
        </v-flex>
        <v-flex xs6>
          <v-select
            :items="middleRange"
            v-model="middle"
            label="2. Teil"
            class="pr-1"
            hide-details
            clearable
          ></v-select>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs3 class="pr-1">
      <v-text-field
        v-model="search"
        label="in der Beschreibung suchen"
        hide-details
        clearable
      ></v-text-field>
    </v-flex>
    <v-flex xs3 class="pr-1">
      <v-select
        v-model="dataType"
        :items="dataTypes"
        item-text="label"
        item-value="value"
        label="Datentyp"
        hide-details
        clearable
      ></v-select>
    </v-flex>
    <v-flex xs4>
    </v-flex>
  </v-layout>
</template>

<script>
  import knxDataTypeFilter from '../../../filter/knx-data-type'

  export default {
    data () {
      return {
        upper: null,
        middle: null,
        search: '',
        dataType: null,
        upperRange: Array.from(Array(8).keys()),
        middleRange: Array.from(Array(32).keys()),
        dataTypes: Array.from(Array(20).keys()).map(i => {
          return {
            label: knxDataTypeFilter(i + 1),
            value: i + 1
          }
        })
      }
    },

    watch: {
      search (value) {
        this.$emit('searchInDescription', value)
      },
      dataType(value){
        this.$emit('searchForDataType', value)
      },
      upper(value) {
        this.$emit('searchInUpperRange', value)
      },
      middle(value) {
        this.$emit('searchInUMiddleRange', value)
      }
    }
  }
</script>
