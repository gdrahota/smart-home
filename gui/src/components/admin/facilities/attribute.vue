<template>
  <v-card tile class="mr-3">
    <v-list dense subheader>
      <v-subheader head>
        <v-layout wrap row>
          <v-flex xs8>
            <v-text-field
              v-model="name"
              :disabled="disabled"
              class="head"
              hide-details
              single-line
              solo
              flat
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
            >
              <v-icon small color="blue darken-2">fa-save</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs2>
            <v-btn
              color="green darken-1"
              icon
              outline
              small
              class="mt-2"
              @click.stop="addEmptyValue"
            >
              <v-icon small color="green darken-1">fa-plus</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-subheader>
      <attribute-value
        v-for="value in valuesByAttributeId(attribute._id)"
        :key="value._id"
        :attribute-value="value"
        :disabled="disabled"
      />
    </v-list>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import AttributeValue from './attribute-value'

  export default {
    components: {
      AttributeValue
    },

    computed: {
      ...mapGetters({
        valuesByAttributeId: 'facilityAttributeValues/getByFacilityAttributeId'
      })
    },

    data () {
      return {
        name: this.attribute.name
      }
    },

    methods: {
      ...mapActions({
        add: 'facilityAttributeValues/addAction'
      }),
      addEmptyValue () {
        this.$emit('enable')
        this.add({
          facilityId: this.facilityId,
          facilityAttributeId: this.attribute._id,
          value: '- neu -'
        })
      }
    },

    props: {
      facilityId: {
        type: String,
        required: true
      },
      attribute: {
        type: Object,
        required: true
      },
      disabled: {
        type: Boolean,
        default: true
      }
    },

    watch: {
      attribute (value) {
        this.name = value.name
      }
    }
  }
</script>

<style scoped>
  [head] {
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    height: 50px;  }
</style>
