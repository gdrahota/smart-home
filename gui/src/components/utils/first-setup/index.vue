<template>
  <v-stepper
    :vertical="false"
    v-model="currentStep"
  >
    <v-stepper-header>
      <v-stepper-step :complete="currentStep > 1" step="1">
        <span>ETS-Projekt laden</span>
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="currentStep > 2" step="2">
        <span>ETS-Projekt auswerten</span>
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="currentStep > 3" step="3">
        <span>Gruppenadressen</span>
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="currentStep > 4" step="4">
        <span>Gebäudestruktur</span>
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="currentStep > 5" step="5">
        <span>Schnittstelle</span>
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card>
          <v-card-text>
            <input ref="ets_project_file_upload" type="file"/>
          </v-card-text>
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card>
          <v-card-text>
          </v-card-text>
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="3">
        <select-group-addresses/>

      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card>
          <v-card-text>
          </v-card-text>
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-card>
          <v-card-text>
          </v-card-text>
        </v-card>
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
  import SelectGroupAddresses from './select-group-addresses'

  const SocketIOFileUpload = require('socketio-file-upload/client')

  export default {
    components: {
      SelectGroupAddresses
    },

    computed: {
      ...mapGetters({
        selected: 'fileUploads/getSelected',
      }),
      currentStep: {
        get () {
          if (!this.selected) {
            return 0
          }

          if (this.selected.outputPathName) {
            return 3
          } else {
            return 2
          }
        },
        set (newValue) {}
      },
    },

    data () {
      return {
        showUsedAddressesOnly: false,
        uploader: null
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
  }
</script>
