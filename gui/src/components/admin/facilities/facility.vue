<template>
  <div>
    <facility-address
      :address="facility.address"
      @update="address => updateAddress(address)"
    />

    <v-card tile class="mt-2">
      <v-card-title class="block">
        <v-btn icon @click.stop="disabledAttributes = !disabledAttributes" :style="{ left: '-10px' }">
          <v-icon v-if="disabledAttributes">fa-lock</v-icon>
          <v-icon v-else>fa-unlock</v-icon>
        </v-btn>
        <span class="subheading">Eigenschaften</span>
        <add-facility-attribute @add="name => addFacilityAttribute(name)" float-right/>
      </v-card-title>
      <v-card-text>
        <v-layout wrap row>
          <v-flex xs3 v-for="attribute of attributesByFacilityId(facility._id)" :key="attribute._id">
            <attribute
              :facilityId="facility._id"
              :attribute="attribute"
              :disabled="disabledAttributes"
              @enable="() => { disabledAttributes = false }"
            />
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import AddFacilityAttribute from './add-facility-attribute'
  import FacilityAddress from './facility-address'
  import Attribute from './attribute'

  export default {
    components: {
      AddFacilityAttribute,
      Attribute,
      FacilityAddress
    },

    computed: {
      ...mapGetters({
        attributesByFacilityId: 'facilityAttributes/getByFacilityId'
      })
    },

    data () {
      return {
        disabledAttributes: true,
        showAddNewAttribute: false
      }
    },

    methods: {
      ...mapActions({
        updateFacility: 'facilities/updateFacilityAction',
        addAttribute: 'facilityAttributes/addAction'
      }),
      updateAddress (address) {
        this.updateFacility({ ...this.facility, address })
      },
      addFacilityAttribute (name) {
        this.addAttribute({
          facilityId: this.facility._id,
          name,
          values: []
        })
      }
    },

    props: {
      facility: {
        type: Object,
        required: true
      }
    }
  }
</script>
