<template>
  <div>
    <v-combobox
      v-model="control"
      :items="controlOptions"
      label="Steuerelement auswählen..."
      item-text="text"
      item-value="value"
      class="pt-4 pr-2 pb-2"
      clearable
      hide-details
      solo
      append-outer-icon-="fa-trash-o"
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
          @agree="() => remove(control)"
        />
      </template>

      <template slot="item" slot-scope="data">
        <v-list-tile-avatar>
          <v-icon small>{{ getIcon(data.item.controlType) }}</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            <span class="left">{{ data.item.text }}</span>
            <span class="right">{{ data.item.textType }}</span>
          </v-list-tile-title>
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
              <v-icon small>{{ getIcon(data.item.controlType) }}</v-icon>
              <span class="pl-3">{{ data.item.text }}</span>
            </div>
            <div fiftyPercent float-left text-right class="body-1">{{ data.item.technology }} - {{ data.item.controlType }}</div>
          </v-list-tile-title>
        </v-list-tile-content>
      </template>
    </v-combobox>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        controls: 'controls/get',
        getSelectedControl: 'controls/getSelectedControl',
        getControlDefinition: 'controls/getDefinitionByName',
      }),
      controlOptions () {
        return this.controls.map(c => {
          const def = this.getControlDefinition(c.controlType)
          return {
            text: c.name,
            textType: def.label,
            value: c._id,
            controlType: c.controlType,
            technology: c.technology
          }
        })
      },
      control: {
        get () {
          const selectedControl = this.getSelectedControl
          if (selectedControl) {
            return {
              text: selectedControl.name,
              value: selectedControl._id,
              controlType: selectedControl.controlType,
              technology: selectedControl.technology
            }
          }
        },
        set (control) {
          if (control) {
            this.selectControl(control.value)
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
      getIcon (controlType) {
        const def = this.getControlDefinition(controlType)
        return def.icon
      },
    }
  }
</script>

<style scoped>
  [fiftyPercent] {
    width: 49%;
  }
</style>
