<template>
  <v-layout row wrap>
    <v-flex class="mb-2 elevation-0" xs4>
      <facilities-list @facility="facility => select(facility)"/>
    </v-flex>
    <v-flex class="pt-4" xs8>
      <add-facility-form
        :showDialog="showAddNewDialog"
        @cancel="() => cancelAddFacility()"
        v-if="!selectedFacility"
      />

      <confirm
        :fab="true"
        :small="true"
        @agree="() => removeFacility(selected._id)"
        description="Löschen XXX"
        title="Löschen"
        v-if="selectedFacility"
      />
    </v-flex>

    <v-flex v-if="selected" xs12>
      <facility :facility="selected"/>
    </v-flex>

  </v-layout>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import FacilitiesList from './facilities-list'
  import Facility from './facility'
  import AddFacilityForm from './add-facility-form'

  export default {
    components: {
      AddFacilityForm,
      FacilitiesList,
      Facility
    },

    computed: {
      ...mapGetters({
        facilities: 'facilities/getActive',
        selected: 'facilities/getSelected'
      }),
      selectedFacility: {
        set (facility) {
          this.select(facility)
        },
        get () {
          return this.selected
        }
      }
    },

    data: () => {
      return {
        showAddNewDialog: false
      }
    },

    methods: {
      ...mapActions({
        remove: 'facilities/removeAction',
      }),

      ...mapMutations({
        select: 'facilities/selectMutation'
      }),
      addFacility (facility) {
        this.add(facility)
        this.showAddNewDialog = false
      },
      cancelAddFacility () {
        this.showAddNewDialog = false
      },
      removeFacility (facilityId) {
        this.remove(facilityId)
      }
    },

    mounted () {
      this.selectedFacility = null
    }
  }
</script>
