<template>
  <v-layout wrap row>
    <v-flex xs4>
      <v-card tile class="mb-2 elevation-0">
        <facilities-list @facility="facility => select(facility)"/>
      </v-card>
    </v-flex>
    <v-flex xs8 class="pl-2">
      <add-facility-form
        v-if="!selectedFacility"
        :showDialog="showAddNewDialog"
        @add="facility => addFacility(facility)"
        @cancel="() => cancelAddFacility()"
      />

      <confirm
        title="Löschen"
        description="Löschen XXX"
        :small="true"
        :fab="true"
        @agree="() => setInactive(selected._id)"
        v-if="selectedFacility"
      />
    </v-flex>

    <v-flex xs12 v-if="selected">
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
        selected: 'facilities/selected'
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
        add: 'facilities/addAction',
        setInactive: 'facilities/setInactiveAction',
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
      }
    }
  }
</script>
