<template>
  <div>
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
    </v-layout>

    <v-tabs
      v-if="selected"
      v-model="activeTab"
      slider-color="cyan"
      color="grey lighten-3"
    >
      <v-tab ripple :key="0">Anschlüsse</v-tab>
      <v-tab ripple :key="1">Tags</v-tab>

      <v-tab-item :key="0">
        <manage-data-points/>
      </v-tab-item>
      <v-tab-item :key="1">
        <v-card>
          <show-facility-attribute-values/>
          <manage-attribute-values/>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
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
        showAddNewDialog: false,
        activeTab: null
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
