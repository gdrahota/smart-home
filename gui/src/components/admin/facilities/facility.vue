<template>
  <div>
    <v-card tile>
      <v-card-title><span class="subheading">Adresse</span></v-card-title>
      <v-card-text>{{ postCode }} {{ city }}, {{ street }}</v-card-text>
    </v-card>

    <v-card tile class="mt-2">
      <v-card-title><span class="subheading">Eigenschaften</span></v-card-title>
      <v-card-text>
        <v-layout wrap row>
          <v-flex xs3 v-for="attribute of facility.attributes" :key="attribute._id">
            <attribute :attribute="attribute"/>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import Attribute from './attribute'

  export default {
    components: {
      Attribute
    },

    computed: {
      postCode () {
        return this.facility.address.postCode
      },
      city () {
        return this.facility.address.city
      },
      street () {
        return this.facility.address.street
      }
    },

    data () {
      return {}
    },

    props: {
      facility: {
        type: Object,
        required: true
      }
    }
  }
</script>
