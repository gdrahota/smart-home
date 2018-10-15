<template>
  <v-flex xs3 class="pr-3 pt-2">
    <v-card>
      <v-card-text>
        <v-list dense subheader>
          <v-subheader head>
            <v-text-field
              v-model="name"
              :disabled="disabled"
              class="head"
              hide-details
              single-line
              solo
              flat
            ></v-text-field>
          </v-subheader>

          <v-chip
            v-for="attributeValue of attributeValues"
            :key="attributeValue._id"
            outline
            color="grey"
          >
            <v-avatar color="grey lighten-1" @click="() => addToControl(attributeValue._id)">
              <v-icon color="white" small>fa-plus</v-icon>
            </v-avatar>
            <span class="black--text">{{ attributeValue.value }}</span>
          </v-chip>

        </v-list>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        attributeValuesByFacilityAttributeId: 'facilityAttributeValues/getByFacilityAttributeId',
        control: 'controls/selected'
      }),
      attributeValues () {
        return this.attributeValuesByFacilityAttributeId(this.attribute._id)
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
        console.log(changedControl)
        this.update(changedControl)
      }
    },

    props: {
      attribute: {
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
</style>
