<template>
  <v-layout wrap raw>
    <v-flex xs4 sm2 lg1 class="pr-3">
      <v-chip label out-line class="full-width">{{ attribute.name }}:</v-chip>
    </v-flex>
    <v-flex xs8 sm10 lg11>
      <v-chip
        v-for="item of values(attribute._id)"
        :key="item._id"
        :color="getTextColor(item._id)"
        outline
        label
        @click="select(item._id)"
      >{{ item.value }}
      </v-chip>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        values: 'facilityAttributeValues/getByFacilityAttributeId'
      })
    },

    props: {
      attribute: {
        type: Object,
        required: true
      },
      attributeValue: {
        type: String,
        default: null
      }
    },

    methods: {
      select (value) {
        this.$emit('setAttributeValue', value)
      },
      getTextColor (value) {
        return (this.attributeValue === value)
          ? 'red'
          : 'black'
      }
    }
  }
</script>
