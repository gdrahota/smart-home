<template>
  <v-layout row wrap>
    <v-flex class="pr-3" xs6>
      <v-card tile>
        <v-text-field
          class="ml-3 mr-3 pt-5"
          flat
          label="Kurzname"
          v-model="controlName"
        >
        </v-text-field>
        <v-text-field
          class="ml-3 mr-3 pt-5"
          flat
          label="Beschreibung"
          v-model="description"
        >
        </v-text-field>
        <component
          :control="control"
          :is="currentComponent"
          v-if="control"
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
  import { mapActions, mapGetters } from 'vuex'
  import ManageAttributeValues from '../manage-attribute-values'
  import ShowFacilityAttributeValues from '../manage-attribute-values/show-attribute-values'
  import KnxTpLightSwitch from './knx-tp-light-switch'
  import KnxTpLightDimmer from './knx-tp-light-dimmer'
  import KnxTpShutter from './knx-tp-shutter'
  import RoomTemperaturControl from './knx-tp-rtc'
  import KnxTpShortCharTextDisplay from './knx-tp-14CharTextDisplay'
  import KnxTpDayNightSwitch from './knx-tp-day-night-switch'

  export default {
    components: {
      ManageAttributeValues,
      KnxTpDayNightSwitch,
      ShowFacilityAttributeValues,
      KnxTpLightSwitch,
      KnxTpLightDimmer,
      KnxTpShutter,
      RoomTemperaturControl,
      KnxTpShortCharTextDisplay,
    },

    computed: {
      ...mapGetters({
        dataPoints: 'dataPoints/get',
        control: 'controls/getSelectedControl'
      }),
      controlName: {
        get () {
          if (this.control) {
            return this.control.name
          }
        },
        set (name) {
          this.update({ ...this.control, name })
        }
      },
      description: {
        get () {
          if (this.control) {
            return this.control.description
          }
        },
        set (description) {
          this.update({ ...this.control, description })
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
          case '14CharTextDisplay':
            return KnxTpShortCharTextDisplay
          case 'dayNightSwitch':
            return KnxTpDayNightSwitch
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
