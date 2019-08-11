<template>
  <v-stepper
    :vertical="false"
    v-model="currentStep"
  >
    <v-stepper-header>
      <v-stepper-step :complete="currentStep > 1" step="1">
        <span>ETS-Projekt</span>
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step :complete="currentStep > 2" step="2">
        <span>Gebäude</span>
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step :complete="currentStep > 3" step="3">
        <span>Räume</span>
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step :complete="currentStep > 4" step="4">
        <span>Schnittstelle</span>
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step :complete="currentStep > 5" step="5">
        <span>Gruppenadressen</span>
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step :complete="currentStep > 6" step="6">
        <span>Controls</span>
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card>
          <v-card-text>
            <input
              accept=".knxproj"
              id="file-upload-btn"
              ref="ets_project_file_upload"
              type="file"
            />
          </v-card-text>
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="2">
        <facilities
          @setFacility="setFacility"
        />
      </v-stepper-content>

      <v-stepper-content step="3">
        <building-parts @setBuildingParts="setRooms"/>
      </v-stepper-content>

      <v-stepper-content step="4">
        <knx-ip-interface @setKnxIpInterface="setKnxIpInterface"/>
      </v-stepper-content>

      <v-stepper-content step="5">
        <select-group-addresses/>
      </v-stepper-content>

      <v-stepper-content step="6">
        <v-card>
          <v-card-text>
          </v-card-text>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Facilities from './facilities'
  import SelectGroupAddresses from './select-group-addresses'
  import BuildingParts from './building-parts'
  import KnxIpInterface from './knx-ip-interface'

  const SocketIOFileUpload = require('socketio-file-upload/client')

  export default {
    components: {
      BuildingParts,
      Facilities,
      KnxIpInterface,
      SelectGroupAddresses,
    },

    computed: {
      ...mapGetters({
        selected: 'fileUploads/getSelected',
      }),
    },

    data () {
      return {
        currentStep: 1,
        showUsedAddressesOnly: false,
        facilityId: null,
        uploader: null,
        roomNames: null,
        knxIpInterface: null,
      }
    },

    destroyed () {
      this.uploader.destroy()
      this.uploader = null
    },

    mounted () {
      this.uploader = new SocketIOFileUpload(this.$socket)
      this.uploader.listenOnInput(this.$refs['ets_project_file_upload'])
    },

    methods: {
      setFacility (facilityId) {
        this.facilityId = facilityId
        this.currentStep = 3
      },
      setRooms (roomNames) {
        this.roomNames = roomNames
        this.currentStep = 4
      },
      setKnxIpInterface (knxIpInterface) {
        this.knxIpInterface = knxIpInterface
        this.currentStep = 5
      }
    },

    watch: {
      selected () {
        if (this.currentStep < 2) {
          this.currentStep = 2
        }
      }
    }
  }
</script>

<style scoped>
  #file-upload-btn {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
  }
</style>
