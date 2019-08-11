<template>
  <div>
    <div class="subheading">Gebäudestruktur</div>

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

    <div class="pt-3">
      <v-btn
        @click="moveToNextStep"
        class="right"
        color="primary"
      >
        {{ selectedNodesNumber }} Gebäudeteile übernehmen
      </v-btn>
      <v-btn
        class="right"
        color="error"
        flat
      >
        Abbrechen
      </v-btn>
    </div>

  </div>
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
    height: calc(100vh - 380px);
    padding: 0 10px;
    margin-top: 10px;
    overflow-y: auto;
  }
</style>
