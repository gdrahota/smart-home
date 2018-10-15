<template>
  <v-card>
    <v-card-text>
      <v-chip
        v-for="value of facilityAttributeValues"
        :key="value._id"
        close
        label
        @input="() => removeValue(value._id)"
      >
        {{ value.value }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        selected: 'controls/selected',
        facilityAttributeValuesById: 'facilityAttributeValues/getById'
      }),
      selectedControl: {
        get () {
          return this.selected
        },
        set (value) {
        }
      },
      facilityAttributeValues () {
        if (!this.selected) {
          return []
        }
        return this
          .selected
          .attributeValues
          .map(attributeValueId => this.facilityAttributeValuesById(attributeValueId))
      }
    },

    methods: {
      ...mapActions({
        update: 'controls/updateAction'
      }),
      removeValue (id) {
        const values = this.selected.attributeValues.filter(valueId => valueId !== id)
        const control = { ...this.selected, attributeValues: values }
        this.update(control)
      }
    }
  }
</script>
