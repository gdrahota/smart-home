<template>
  <v-layout wrap row>
    <select-attribute-value
      v-for="attribute of attributes"
      :attribute="attribute"
      :key="attribute._id"
    />
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SelectAttributeValue from './select-attribute-value'

  export default {
    components: {
      SelectAttributeValue
    },

    computed: {
      ...mapGetters({
        attributesByFacilityId: 'facilityAttributes/getByFacilityId',
        attributeValuesByFacilityAttributeId: 'facilityAttributes/getByFacilityAttributeId',
        control: 'controls/selected'
      }),
      attributes () {
        if (!this.control) {
          return []
        }
        return this.attributesByFacilityId(this.control.facilityId)
      }
    }
  }
</script>
