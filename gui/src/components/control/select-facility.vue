<template>
  <div>
    <v-select
      :items="getLabels"
      label="Gebäude"
      item-text="text"
      v-model="facility"
    >
      <template slot="selection" slot-scope="{ item, index }">
        <span>{{ getLabel }}</span>
      </template>
    </v-select>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        facilities: 'facilities/get'
      }),
      getLabels () {
        return this.facilities.map(f => {
          const address = f.address
          return {
            text: address.postCode + ' ' + address.city + ', ' + address.street,
            value: f
          }
        })
      },
      getLabel () {
        const address = this.facility.address
        return address.postCode + ' ' + address.city + ', ' + address.street
      }
    },

    data () {
      return {
        facility: null
      }
    },

    watch: {
      facility (facility) {
        this.$emit('setFacility', facility)
      }
    }
  }
</script>
