<template>
  <v-layout row wrap>
    <v-flex xs6 class="pr-3">
      <v-card>
        <component
          v-if="control"
          :is="currentComponent"
          :control="control"
        />
      </v-card>
    </v-flex>

    <v-flex xs6>
      <v-card tile>
        <manage-attribute-values/>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'
  import KnxTpLightSwitch from './knx-tp-light-switch'
  import KnxTpLightDimmer from './knx-tp-light-dimmer'
  import ManageAttributeValues from '../manage-attribute-values'
  import ShowFacilityAttributeValues from '../manage-attribute-values/show-attribute-values'

  export default {
    components: {
      ManageAttributeValues,
      ShowFacilityAttributeValues,
      KnxTpLightSwitch,
      KnxTpLightDimmer,
    },

    computed: {
      ...mapGetters({
        dataPoints: 'dataPoints/get',
        control: 'controls/getSelected'
      }),
      currentComponent () {
        console.log('???', this.control)
        switch (this.control.controlType) {
          case 'lightDimmer':
            console.log('lightDimmer')
            return KnxTpLightDimmer
          case 'lightSwitch':
            console.log('lightSwitch')
            return KnxTpLightSwitch
          default:
            console.log('default')
            return KnxTpLightSwitch
        }
      }
    }
  }
</script>
