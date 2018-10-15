<template>
  <v-layout wrap row>
    <v-flex xs4>
      <v-card tile class="mb-2 elevation-0">
        <controls-list/>
      </v-card>
    </v-flex>
    <v-flex xs8 class="pl-2">
      <add-control-form
        v-if="!selectedControl"
        :showDialog="showAddNewDialog"
        @add="control => addControl(control)"
        @cancel="() => cancelAddFacility()"
      />

      <confirm
        title="Löschen"
        description="Löschen XXX"
        :small="true"
        :fab="true"
        @agree=""
      />
    </v-flex>

    <v-flex xs12 v-if="selected">
      <!--<facility :facility="selected"/>-->
    </v-flex>

  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import AddControlForm from './add-control-form'
  import ControlsList from './controls-list'

  export default {
    components: {
      AddControlForm,
      ControlsList
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

    methods: {
      ...mapActions({
        add: 'controls/addAction'
      }),
      select (control) {},
      addControl(control) {
        this.add({
          ...control,
          attributeValues: []
        })
      }
    }
  }
</script>
