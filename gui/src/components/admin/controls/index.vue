<template>
  <div>
    <v-card tile class="mb-2 elevation-1">
      <v-layout wrap row>
        <v-flex xs4>
          <controls-list/>
        </v-flex>
        <v-flex xs8 class="pl-2">
          <add-control-form
            v-if="!selectedControl"
            :showDialog="showAddNewDialog"
            @add="control => addControl(control)"
            @cancel="() => cancelAddFacility()"
            class="pt-3"
          />

          <confirm
            title="Steuerelement Löschen"
            description="Dieses Steuerelement löschen?"
            :small="true"
            :fab="true"
            @agree="() => remove(selected._id)"
            class="pt-3"
          />
        </v-flex>

      </v-layout>
    </v-card>

    <show-facility-attribute-values/>

    <manage-attribute-values v-if="selected"/>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import AddControlForm from './add-control-form'
  import ControlsList from './controls-list'
  import ManageAttributeValues from './manage-attribute-values'
  import ShowFacilityAttributeValues from './manage-attribute-values/show-attribute-values'

  export default {
    components: {
      AddControlForm,
      ControlsList,
      ManageAttributeValues,
      ShowFacilityAttributeValues
    },

    computed: {
      ...mapGetters({
        controls: 'controls/get',
        selected: 'controls/selected'
      }),
      selectedControl: {
        get () {
          return this.selected
        },
        set (value) {
        }
      }
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
      removeValue (valueId) {
        console.log('removeValue', valueId)
      },
      addControl (control) {
        this.add({
          ...control,
          attributeValues: []
        })
      }
    }
  }
</script>
