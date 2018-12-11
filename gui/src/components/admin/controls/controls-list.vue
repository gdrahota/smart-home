<template>
  <v-select
    :items="controls"
    v-model="control"
    label="Steuerelement auswählen..."
    class="pt-4 pr-2 pb-2"
    box-
    clearable
    hide-details
    solo
    append-outer-icon-="fa-trash-o"
    append-outer-icon--cb="test"
  >
    <template slot="append">
      <confirm
        v-if="control"
        title="Steuerelement Löschen"
        description="Dieses Steuerelement löschen?"
        :small="true"
        :fab-="true"
        label="Löschen"
        class="pt-0 pl-3"
        @agree="() => remove(control._id)"
      />
    </template>

    <template slot="item" slot-scope="data">
      <v-list-tile-avatar>
        <v-icon>{{ getIcon(data.item.controlType) }}</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-text="data.item.name"></v-list-tile-title>
      </v-list-tile-content>
    </template>

    <template
      slot="selection"
      slot-scope="data"
      class="pl-2 pt-4 pr-2 pb-3"
    >
      <v-list-tile-content full-width>
        <v-list-tile-title>
          <div fiftyPercent float-left>
            <v-icon>{{ getIcon(data.item.controlType) }}</v-icon>
            <span class="pl-3">{{ data.item.name }}</span>
          </div>
          <div fiftyPercent float-left text-right class="body-1">{{ data.item.technology }} - {{ data.item.controlType }}</div>
        </v-list-tile-title>
      </v-list-tile-content>
    </template>
  </v-select>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        controls: 'controls/get',
        getSelectedControl: 'controls/getSelected'
      }),
      control: {
        get () {
          return this.getSelectedControl
        },
        set (value) {
          if (value) {
            this.selectControl(value._id)
          } else {
            this.selectControl(null)

          }
        }
      }
    },

    methods: {
      ...mapActions({
        remove: 'controls/removeAction',
      }),
      ...mapMutations({
        selectControl: 'controls/selectControl'
      }),
      test () {},
      getIcon (controlType) {
        switch (controlType) {
          case 'lightSwitch':
          case 'lightDimmer':
            return 'fa-lightbulb-o'
          case 'shutter':
            return 'fa-bars'
          default         :
            return 'fa-minus'
        }
      }
    }
  }
</script>

<style scoped>
  [fiftyPercent] {
    width: 49%;
  }
</style>
