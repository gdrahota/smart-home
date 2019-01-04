<template>
  <v-layout row wrap>
    <v-flex xs6 class="pr-3">
      <v-card tile>
        <v-text-field
          v-model="controlName"
          label="Name des Steuerelements"
          class="ml-3 mr-3 pt-5"
          flat
        >
        </v-text-field>
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
  import { mapGetters, mapActions } from 'vuex'
  import ManageAttributeValues from '../manage-attribute-values'
  import ShowFacilityAttributeValues from '../manage-attribute-values/show-attribute-values'
  import KnxTpLightSwitch from './knx-tp-light-switch'
  import KnxTpLightDimmer from './knx-tp-light-dimmer'
  import KnxTpShutter from './knx-tp-shutter'
  import RoomTemperaturControl from './knx-tp-rtc'

  export default {
    components: {
      ManageAttributeValues,
      ShowFacilityAttributeValues,
      KnxTpLightSwitch,
      KnxTpLightDimmer,
      KnxTpShutter,
      RoomTemperaturControl,
    },

    computed: {
      ...mapGetters({
        dataPoints: 'dataPoints/get',
        control: 'controls/getSelectedControl'
      }),
      controlName: {
        get () {
          return this.control.name
        },
        set (name) {
          this.update({ ...this.control, name })
        }
      },
      currentComponent () {
        switch (this.control.controlType) {
          case 'lightDimmer':
            return KnxTpLightDimmer
          case 'lightSwitch':
            return KnxTpLightSwitch
          case 'shutter':
            return KnxTpShutter
          case 'rtc':
            return RoomTemperaturControl
          default:
            return KnxTpLightSwitch
        }
      }
    },

    methods: {
      ...mapActions({
        update: 'controls/updateAction'
      })
    }
  }
</script>
