<template>
  <v-select
    :items="controls"
    v-model="control"
    label="Steuerelement auswählen..."
    clearable
    hide-actions
    box
    flat
    hide-details
  >
    <template slot="item" slot-scope="data">
      <v-list-tile-content>{{ data.item }}</v-list-tile-content>
    </template>

    <template slot="selection" slot-scope="data">
      <span class="pl-3">{{ data.item }}</span>
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
