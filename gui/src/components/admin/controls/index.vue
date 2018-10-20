<template>
  <v-layout wrap row>
    <v-flex xs4>
      <controls-list/>
    </v-flex>
    <v-flex xs8 class="mb-3">
      <add-control-form
        v-if="!selected"
        :showDialog="showAddNewDialog"
        @add="control => addControl(control)"
        @cancel="() => cancelAddFacility()"
        class="pt-4"
      />
      <confirm
        v-if="selected"
        title="Steuerelement Löschen"
        description="Dieses Steuerelement löschen?"
        :small="true"
        :fab="true"
        @agree="() => remove(selected._id)"
        class="pt-4"
      />
    </v-flex>

    <v-flex xs6 class="pr-2" v-if="selected">
      <manage-data-points/>
    </v-flex>

    <v-flex xs6 v-if="selected">
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
        controls: 'controls/get',
        selected: 'controls/selected'
      })
    },

    data () {
      return {
        showAddNewDialog: false
      }
    },

    methods: {
      ...mapActions({
        add: 'controls/addAction',
        remove: 'controls/removeAction'
      }),
      ...mapMutations({
        selectControl: 'controls/selectMutation'
      }),
      removeValue (valueId) {
        console.log('removeValue', valueId)
      },
      addControl (control) {
        this.add({
          ...control,
          attributeValues: []
        })
      }
    },

    mounted () {
      this.selectControl(null)
    }
  }
</script>
