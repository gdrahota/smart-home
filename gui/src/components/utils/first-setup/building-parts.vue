<template>
  <v-card>
    <v-card-title class="subheading">Räume</v-card-title>

    <div class="wrapper">
      <v-treeview
        :items="buildingParts"
        item-children="buildingParts"
      >
        <template slot="prepend" slot-scope="{ item }">
          <v-icon small v-if="item.buildingParts.length === 0">fa-minus</v-icon>
          <div style="width: 30px; padding-left: 10px;">
            <v-checkbox
              :height="20"
              flat
              hide-details
              style="top: -10px; position: relative"
              v-model="item.selected"
            />
          </div>
        </template>
      </v-treeview>
    </div>

    <v-card-actions class="actions-section">
      <v-spacer></v-spacer>
      <v-btn
        color="error"
        flat
      >
        Abbrechen
      </v-btn>
      <v-btn
        @click="moveToNextStep"
        color="primary"
      >
        {{ selectedNodesNumber }} Räume übernehmen
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        buildingParts: 'fileUploads/getBuildingParts',
      }),
      selectedNodesNumber () {
        if (this.buildingParts && this.buildingParts.length > 0) {
          return this.countSelectedNodes(this.buildingParts[0])
        }
        return 0
      }
    },

    methods: {
      countSelectedNodes (node) {
        let counter = 0

        counter = node.selected ? counter + 1 : counter

        node.buildingParts.forEach(i => {
          counter = counter + this.countSelectedNodes(i)
        })

        return counter
      },
      getSelectedBuildingParts (node) {
        let selected = []

        if (node.selected) {
          selected.push(node.name)
        }

        node.buildingParts.forEach(i => {
          selected = [...selected, ...this.getSelectedBuildingParts(i)]
        })

        return selected
      },
      moveToNextStep () {
        this.$emit('setBuildingParts', this.getSelectedBuildingParts(this.buildingParts[0]))
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    border: 1px dotted #bbb;
    border-radius: 4px;
    height: calc(100vh - 400px);
    padding: 0 10px;
    margin-top: 10px;
    overflow-y: auto;
  }
</style>
