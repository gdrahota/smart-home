<template>
  <v-layout wrap row>
    <v-flex xs4>
      <controls-list
        :selectedControl="selectedControl"
        @select="value => selectControl(value)"
      />
    </v-flex>
    <v-flex xs8 class="mb-3">
      <add-control-form
        v-if="!selectedControl"
        :showDialog="showAddNewDialog"
        @add="control => addControl(control)"
        @cancel="() => cancelAddFacility()"
        class="pt-4"
      />
      <confirm
        v-if="selectedControl"
        title="Steuerelement Löschen"
        description="Dieses Steuerelement löschen?"
        :small="true"
        :fab="true"
        @agree="() => remove(selectedControl._id)"
        class="pt-4"
      />
    </v-flex>

    <v-flex xs6 class="pr-2" v-if="selectedControl">
      <manage-data-points
        :control="selectedControl"
      />
    </v-flex>

    <v-flex xs6 v-if="selectedControl">
      <show-facility-attribute-values/>
      <manage-attribute-values/>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import AddControlForm from './add-control-form'
  import ControlsList from './controls-list'
  import ManageAttributeValues from './manage-attribute-values'
  import ShowFacilityAttributeValues from './manage-attribute-values/show-attribute-values'
  import ManageDataPoints from './manage-data-points/index'

  export default {
    components: {
      AddControlForm,
      ControlsList,
      ManageAttributeValues,
      ManageDataPoints,
      ShowFacilityAttributeValues
    },

    computed: {
      ...mapGetters({
        controls: 'controls/get'
      })
    },

    data () {
      return {
        showAddNewDialog: false,
        selectedControl: null
      }
    },

    methods: {
      ...mapActions({
        add: 'controls/addAction',
        remove: 'controls/removeAction'
      }),
      removeValue (valueId) {
        console.log('removeValue', valueId)
      },
      addControl (control) {
        this.add({
          ...control,
          attributeValues: []
        })
      },
      selectControl (control) {
        this.selectedControl = control
      }
    }
  }
</script>
