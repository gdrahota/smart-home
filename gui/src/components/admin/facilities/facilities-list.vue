<template>
  <v-select
    :items="facilities"
    v-model="facility"
    label="Gebäude auswählen..."
    class="pt-4 pr-2 pb-2"
    box
    clearable
    hide-actions
    hide-details
    solo
  >
    <template slot="item" slot-scope="data">
      <v-list-tile-content v-text="getAddress(data.item.address)"/>
    </template>

    <template slot="selection" slot-scope="data">
      <span v-text="getAddress(data.item.address)" class="pl-3"/>
    </template>

  </v-select>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        facilities: 'facilities/getActive',
        selected: 'facilities/getSelected'
      }),
      facility: {
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
        select: 'facilities/selectMutation'
      }),
      getAddress: ({ city, postCode, street }) => {
        return postCode + ' ' + city + ', ' + street
      }
    },

    watch: {
      facility (value) {
        this.$emit('facility', value)
      }
    }
  }
</script>
