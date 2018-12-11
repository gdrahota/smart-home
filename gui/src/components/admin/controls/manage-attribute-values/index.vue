<template>
  <div class="mt-1">
    <show-attribute-values :control="control"/>
    <v-card class="border-top">
      <v-card-title>
        <div class="body-1">Verfügbare Tags:</div>
      </v-card-title>
      <select-attribute-value
        v-for="attribute of attributes"
        :control="control"
        :attribute="attribute"
        :key="attribute._id"
      ></select-attribute-value>
    </v-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SelectAttributeValue from './select-attribute-value'
  import ShowAttributeValues from './show-attribute-values'

  export default {
    components: {
      ShowAttributeValues,
      SelectAttributeValue
    },

    computed: {
      ...mapGetters({
        control: 'controls/getSelected',
        attributesByFacilityId: 'facilityAttributes/getByFacilityId',
        attributeValuesByFacilityAttributeId: 'facilityAttributes/getByFacilityAttributeId',
      }),
      attributes () {
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
