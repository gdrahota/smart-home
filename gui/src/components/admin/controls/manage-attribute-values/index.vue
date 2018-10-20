<template>
  <v-card class="border-top">
    <v-card-title>
      <div class="body-1">Verfügbare Tags:</div>
    </v-card-title>
    <select-attribute-value
      v-for="attribute of attributes"
      :attribute="attribute"
      :key="attribute._id"
    ></select-attribute-value>
  </v-card>
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

<style scoped>
  .border-top {
    border-top: 1px solid #eee !important;
  }
</style>
