<template>
  <v-card tile class="mr-3">
    <v-card-title class="header block">
      <span>{{ attribute.name }}</span>
      <v-btn ripple small icon float-right>
        <v-icon small>fa-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-list dense subheader->
      <v-list-tile
        v-for="value in attribute.instances"
        :key="value._id"
        @click=""
      >
        <v-list-tile-content>
          <attribute-value :attribute-value="value"/>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="grey lighten-1" small>fa-trash</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
  import AttributeValue from './attribute-value'

  export default {
    components: {
      AttributeValue
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
  .header {
    background-color: lightgray;
  }
</style>
