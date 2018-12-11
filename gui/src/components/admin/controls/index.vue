<template>
  <v-layout wrap row>
    <v-flex xs6 class="pr-2">
      <controls-list/>
    </v-flex>
    <v-flex xs6 class="mb-4">
      <add-control-form
        :disabled="!!selectedControl"
        :showDialog="showAddNewDialog"
        @add="control => addControl(control)"
        @cancel="() => cancelAddFacility()"
        class="pt-4"
      />
    </v-flex>

    <v-flex xs12 v-if="selectedControl">
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
        selectedControl: 'controls/getSelected'
      })
    },

    data () {
      return {
        showAddNewDialog: false
      }
    },

    methods: {
      ...mapActions({
        add: 'controls/addAction'
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
