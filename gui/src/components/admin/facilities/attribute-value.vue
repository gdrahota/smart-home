<template>
  <v-list-tile>
    <v-layout wrap row>

      <v-flex xs8>
        <v-text-field
          solo
          flat
          hide-details
          v-model="value"
          :disabled="disabled"
        />
      </v-flex>

      <v-flex xs2>
        <v-btn
          v-if="!disabled"
          color="blue darken-2"
          class="mt-2"
          icon
          outline
          small
          @click.stop="updateValue"
        >
          <v-icon small color="blue darken-2">fa-save</v-icon>
        </v-btn>
      </v-flex>

      <v-flex xs2>
        <v-btn
          color="grey lighten-1"
          class="mt-2"
          icon
          outline
          small
          @click.stop="() => remove(attributeValue._id)"
        >
          <v-icon color="grey lighten-1" small>fa-trash</v-icon>
        </v-btn>
      </v-flex>

    </v-layout>
  </v-list-tile>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        value: this.attributeValue.value
      }
    },

    props: {
      'attribute-value': {
        type: Object,
        default: () => {}
      },
      disabled: {
        type: Boolean,
        default: true
      }
    },

    methods: {
      ...mapActions({
        update: 'facilityAttributeValues/updateAction',
        remove: 'facilityAttributeValues/removeAction'
      }),
      updateValue () {
        this.update({ ...this.attributeValue, value: this.value })
      }
    },

    watch: {
      attributeValue (attributeValue) {
        this.value = attributeValue.value
      }
    }
  }
</script>
