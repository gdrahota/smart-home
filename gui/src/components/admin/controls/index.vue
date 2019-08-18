<template>
  <v-layout row wrap>
    <v-flex class="pr-2" xs6>
      <controls-list/>
    </v-flex>
    <v-flex class="mb-4" xs6>
      <add-control-form
        :disa-bled="!!getSelectedControlId"
        @add="control => addControl(control)"
        @cancel="() => cancelAddFacility()"
        class="pt-4"
      />
    </v-flex>

    <v-flex v-if="getSelectedControlId" xs12>
      <v-switch
        label="Nur bisher nicht verwendete Gruppenadressen"
        v-model="showOnlyUnusedDataPoints"
      />
    </v-flex>

    <v-flex v-if="getSelectedControlId" xs12>
      <manage-data-points/>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import AddControlForm from './add-control-form'
  import ControlsList from './controls-list'
  import ManageDataPoints from './manage-data-points/index'

  export default {
    components: {
      AddControlForm,
      ControlsList,
      ManageDataPoints
    },

    computed: {
      ...mapGetters({
        controls: 'controls/get',
        getSelectedControlId: 'controls/getSelectedControlId',
        getShowOnlyUnusedDataPoints: 'dataPoints/getShowOnlyUnusedDataPoints',
      }),
      showOnlyUnusedDataPoints: {
        get () {
          return this.getShowOnlyUnusedDataPoints
        },
        set () {

        }
      }
    },

    methods: {
      ...mapActions({
        add: 'controls/addAction'
      }),
      ...mapMutations({
        setShowOnlyUnusedDataPoints: 'dataPoints/setShowOnlyUnusedDataPointsMutation',
      }),
      addControl (control) {
        this.add({
          ...control,
          attributeValues: []
        })
      }
    }
  }
</script>
