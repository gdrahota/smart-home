<template>
  <v-select
    :items="controls"
    v-model="control"
    label="Steuerelement auswählen..."
    class="pt-4 pr-2 pb-2"
    box
    clearable
    hide-actions
    hide-details
    solo
  >
    <template slot="item" slot-scope="data">
      <v-list-tile-content>{{ data.item.name }}</v-list-tile-content>
    </template>

    <template
      slot="selection"
      slot-scope="data"
      class="pl-2 pt-4 pr-2 pb-3"
    >
      <v-list-tile-content full-width>
        <v-list-tile-title>
          <div fiftyPercent float-left>{{ data.item.name }}</div>
          <div fiftyPercent float-left text-right class="body-1">{{ data.item.technology }} - {{ data.item.controlType }}</div>
        </v-list-tile-title>
      </v-list-tile-content>
    </template>

  </v-select>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        controls: 'controls/get',
        selected: 'controls/selected'
      }),
      control: {
        get () {
          return this.selected
        },
        set (value) {
          this.select(value)
        }
      }
    },

    methods: {
      ...mapMutations({
        select: 'controls/selectMutation'
      })
    }
  }
</script>

<style scoped>
  [fiftyPercent] {
    width: 49%;
  }
</style>
