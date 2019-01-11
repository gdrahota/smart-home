<template>
  <v-layout wrap raw>
    <v-flex xs12 sm3 lg2 class="pr-3">
      <v-chip label out-line class="full-width">{{ attribute.name }}:</v-chip>
    </v-flex>
    <v-flex xs12 sm9 lg10>
      <v-btn
        v-for="item of values(attribute._id)"
        :key="item._id"
        :color="getTextColor(item._id)"
        outline
        label
        @click="select(item._id)"
        small
      >{{ item.value }}
      </v-btn>
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
