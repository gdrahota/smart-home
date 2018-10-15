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

    <v-card>
      <v-card-text>
        <v-chip
          v-for="value of facilityAttributeValues"
          :key="value._id"
          close
          label
        >
          {{ value.value }}
        </v-chip>
      </v-card-text>
    </v-card>

    <manage-attribute-values v-if="selected"/>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import AddControlForm from './add-control-form'
  import ControlsList from './controls-list'
  import ManageAttributeValues from './manage-attribute-values'

  export default {
    components: {
      AddControlForm,
      ControlsList,
      ManageAttributeValues
    },

    computed: {
      ...mapGetters({
        controls: 'controls/get',
        selected: 'controls/selected',
        facilityAttributeValuesById: 'facilityAttributeValues/getById'
      }),
      selectedControl: {
        get () {
          return this.selected
        },
        set (value) {
        }
      },
      facilityAttributeValues () {
        if (!this.selected) {
          return []
        }
        return this
          .selected
          .attributeValues
          .map(attributeValueId => this.facilityAttributeValuesById(attributeValueId))
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
      select (control) {},
      addControl (control) {
        this.add({
          ...control,
          attributeValues: []
        })
      }
    }
  }
</script>
