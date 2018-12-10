<template>
  <v-card>
    <v-card-title>
      <div class="body-1">Zugewiesene Tags:</div>
    </v-card-title>
    <v-card-text>
      <v-chip
        v-for="value of facilityAttributeValues"
        :key="value._id"
        close
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
        facilityAttributeValuesById: 'facilityAttributeValues/getById'
      }),
      facilityAttributeValues () {
        return this
          .control
          .attributeValues
          .map(attributeValueId => this.facilityAttributeValuesById(attributeValueId))
      }
    },

    methods: {
      ...mapActions({
        update: 'controls/updateAction'
      }),
      removeValue (id) {
        const values = this.control.attributeValues.filter(valueId => valueId !== id)
        const control = { ...this.control, attributeValues: values }
        console.log(control)
        this.update(control)
      }
    },

    props: {
      control: {
        type: Object
      }
    }
  }
</script>
