<template>
  <v-data-table
    :headers="headers"
  ></v-data-table>
</template>

<script>
  import VDataTable from 'vuetify/src/components/VDataTable/VDataTable'

  export default {
    components: { VDataTable },

    data () {
      return {
        headers: [
          { name: 'Ort', value: 'city' }
        ]
      }
    },

    props: {
      address: {
        type: Object,
        required: true
      }
    }
  }
</script>
