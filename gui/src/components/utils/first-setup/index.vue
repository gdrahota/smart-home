<template>
  <div>
    <v-stepper
      :vertical="false"
      v-model="currentStep"
    >
      <v-stepper-header>
        <v-stepper-step :complete="!!buildingParts" step="1">
          <span @click="gotoStep(1)">ETS-Projekt</span>
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="!!setup.facilityId" step="2">
          <span @click="gotoStep(2)">Gebäude</span>
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="!!setup.roomNames" step="3">
          <span @click="gotoStep(3)">Räume</span>
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="!!setup.knxIpInterface && getDevices.length > 0" step="4">
          <span @click="gotoStep(4)">Schnittstelle</span>
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="!!setup.groupAddresses" step="5">
          <span @click="gotoStep(5)">Gruppenadressen</span>
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="!!setup.groupAddresses" step="6">
          <span @click="gotoStep(6)">Daten übernehmen</span>
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card>
            <v-card-text>
              <input
                @input="reset"
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
          <select-group-addresses @addGroupAddresses="addGroupAddresses"/>
        </v-stepper-content>

        <v-stepper-content step="6">
          <create-selected-objects
            :setup="setup"
            @save="save"
            v-if="currentStep === 6"
          />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Facilities from './facilities'
  import SelectGroupAddresses from './select-group-addresses'
  import BuildingParts from './building-parts'
  import KnxIpInterface from './knx-ip-interface'
  import CreateSelectedObjects from './create-selected-objects'
  import SocketIOFileUpload from 'socketio-file-upload/client'

  export default {
    components: {
      BuildingParts,
      CreateSelectedObjects,
      Facilities,
      KnxIpInterface,
      SelectGroupAddresses,
    },

    computed: {
      ...mapGetters({
        selected: 'fileUploads/getSelected',
        buildingParts: 'fileUploads/getBuildingParts',
        getDevices: 'fileUploads/getDevices'
      }),
    },

    data () {
      return {
        currentStep: 1,
        uploader: null,
        setup: {
          facilityId: null,
          roomNames: null,
          knxIpInterface: null,
          groupAddresses: null,
        }
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
      ...mapActions({
        saveNewObjects: 'fileUploads/saveNewObjectsAction',
      }),
      setFacility (facilityId) {
        this.setup.facilityId = facilityId
        this.currentStep = 3
      },
      setRooms (roomNames) {
        this.setup.roomNames = roomNames
        this.currentStep = 4
      },
      setKnxIpInterface (knxIpInterface) {
        this.setup.knxIpInterface = knxIpInterface
        this.currentStep = 5
      },
      addGroupAddresses (groupAddresses) {
        this.setup.groupAddresses = groupAddresses
        this.currentStep = 6
      },
      gotoStep (step) {
        switch (step) {
          case 1:
            this.currentStep = 1
            break
          case 2:
            if (this.setup.facilityId) {
              this.currentStep = 2
            }
            break
          case 3:
            if (this.setup.facilityId) {
              this.currentStep = 3
            }
            break
          case 4:
            if (this.setup.roomNames) {
              this.currentStep = 4
            }
            break
          case 5:
            if (this.setup.knxIpInterface) {
              this.currentStep = 5
            }
            break
          case 6:
            if (this.setup.facilityId && this.setup.roomNames && this.setup.knxIpInterface && this.setup.groupAddresses) {
              this.currentStep = 6
            }
            break
        }
      },
      reset () {
        this.setup = {
          facilityId: null,
          roomNames: null,
          knxIpInterface: null,
          groupAddresses: null,
        }
      },
      save () {
        this.saveNewObjects(this.setup)
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

<style>
  .actions-section {
    padding: 15px 0 0 15px;
  }
</style>
