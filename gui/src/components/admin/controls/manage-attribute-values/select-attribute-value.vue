<template>
  <v-card-text>
    <v-layout wrap row>
      <v-flex xs1>
        <v-text-field
          v-model="name"
          :disabled="disabled"
          class="head body-1"
          hide-details
          single-line
          solo
          flat
        ></v-text-field>
      </v-flex>

      <v-flex xs11>
        <v-chip
          v-for="attributeValue of availableAttributeValues"
          :key="attributeValue._id"
          outline
          color="grey"
        >
          <span class="black--text">{{ attributeValue.value }}</span>
          <v-icon
            color="green darken-2"
            right
            @click="() => addToControl(attributeValue._id)"
            class="clickable"
          >fa-plus-circle
          </v-icon>
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
        attributeValuesByFacilityAttributeId: 'facilityAttributeValues/getByFacilityAttributeId'
      }),
      availableAttributeValues () {
        const currentValues = this.control.attributeValues
        return this.attributeValuesByFacilityAttributeId(this.attribute._id).filter(value => currentValues.indexOf(value._id) === -1)
      }
    },

    data () {
      return {
        disabled: false,
        name: this.attribute.name
      }
    },

    methods: {
      ...mapActions({
        update: 'controls/updateAction'
      }),
      addToControl (facilityAttributeValueId) {
        const values = [...this.control.attributeValues, facilityAttributeValueId]
        const changedControl = {
          ...this.control,
          attributeValues: values
        }
        this.update(changedControl)
      }
    },

    props: {
      attribute: {
        type: Object,
        required: true
      },
      control: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
  [head] {
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    height: 50px;
  }

  .clickable {
    cursor: pointer;
  }
</style>
