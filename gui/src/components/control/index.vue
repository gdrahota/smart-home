<template>
  <div>
    <v-card>
      <v-card-text>
        <v-layout>
          <v-flex class="pr-2" lg3 sm6 xs12>
            <span v-if="facilities.length === 0">
              <i>Sie haben noch keine Gebäude registriert.</i>
            </span>
            <select-facilities v-else-if="facilities.length > 1"/>
          </v-flex>
        </v-layout>

        <template v-if="selectedFacility">
          <select-attribute-value
            v-for="attribute of attributes(selectedFacility._id)"
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
        class="pb-3"
        :class="{ 'pr-0': $vuetify.breakpoint.xsOnly, 'pr-3': !$vuetify.breakpoint.xsOnly }"
        lg2 md3 sm6 xs12
      >
        <control :control="control"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
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
        facilities: 'facilities/get',
        selectedFacility: 'facilities/getSelected',
        attributes: 'facilityAttributes/getByFacilityId',
        controls: 'controls/getByAttributeValue'
      })
    },

    created () {
      if (this.facilities.length === 1) {
        this.selectFacility(this.facilities[0])
      }
    },

    data () {
      return {
        attributeValue: null
      }
    },

    methods: {
      ...mapMutations({
        selectFacility: 'facilities/selectMutation'
      }),
      setAttributeValue (value) {
        this.attributeValue = value
      }
    },

    watch: {
      facilities (facilities) {
        if (facilities.length === 1) {
          this.selectFacility(facilities[0])
        }
      }
    }
  }
</script>
