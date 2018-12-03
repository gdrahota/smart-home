<template>
  <div>
    <v-card>
      <v-card-text>
        <v-layout>
          <v-flex class="pr-2" lg3 sm6 xs12>
            <select-facilities
              @setFacility="value => setFacility(value)"
            />
          </v-flex>
        </v-layout>

        <template v-if="facility">
          <select-attribute-value
            v-for="attribute of attributes(facility._id)"
            :key="attribute._id"
            :attribute="attribute"
            :attributeValue="attributeValue"
            @setAttributeValue="value => setAttributeValue(value)"
          />
        </template>
      </v-card-text>
    </v-card>
    <v-layout wrap row class="mt-3" v-if="attributeValue">
      <v-flex
        v-for="control of controls(attributeValue)"
        :key="control._id"
        class="pr-2 pb-2"
        lg2 md3 sm6 xs12
      >
        <control :control="control"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SelectFacilities from './select-facility'
  import SelectAttributeValue from './select-attribute-value'
  import Control from './control'

  export default {
    components: {
      Control,
      SelectAttributeValue,
      SelectFacilities
    },

    computed: {
      ...mapGetters({
        attributes: 'facilityAttributes/getByFacilityId',
        controls: 'controls/getByAttributeValue'
      })
    },

    data () {
      return {
        facility: null,
        attributeValue: null
      }
    },

    methods: {
      setFacility (value) {
        this.facility = value
      },
      setAttributeValue (value) {
        this.attributeValue = value
      }
    }
  }
</script>
