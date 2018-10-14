<template>
  <v-select
    :items="facilities"
    v-model="facility"
    label="Gebäude"
    clearable
    hide-actions
    box
    flat
    hide-details
  >
    <template slot="item" slot-scope="data">
      <v-list-tile-content v-text="getAddress(data.item.address)"/>
    </template>

    <template slot="selection" slot-scope="data">
      <span v-text="getAddress(data.item.address)" class="pl-3"/>
    </template>

  </v-select>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        facilities: 'facilities/getActive'
      })
    },

    data: () => {
      return {
        facility: null
      }
    },

    methods: {
      getAddress: ({ city, postCode, street }) => {
        return postCode + ' ' + city + ', ' + street
      }
    },

    watch: {
      facility (value) {
        this.$emit('facility', value)
      }
    }
  }
</script>
