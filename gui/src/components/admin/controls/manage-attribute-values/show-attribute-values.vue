<template>
  <v-card-text>
    <v-layout wrap row>
      <v-flex xs1>
        <div class="subheading">
          <v-chip label>Tags:</v-chip>
        </div>
      </v-flex>
      <v-flex xs11>
        <v-chip
          v-for="value of facilityAttributeValues"
          :key="value._id"
          close
          @input="() => removeValue(value._id)"
        >
          {{ value.value }}
        </v-chip>
      </v-flex>
    </v-layout>
  </v-card-text>
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
