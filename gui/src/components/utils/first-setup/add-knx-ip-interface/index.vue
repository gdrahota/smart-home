<template>
  <v-dialog
    :width="1500"
    persistent
    scrollable
    v-if="getDevices"
    v-model="show"
  >
    <v-btn
      :style="{ top: '5px' }"
      absolute
      class="elevation-2"
      color="primary"
      dark
      fab
      right
      slot="activator"
      small
      top
    >
      <v-icon>fa-plus</v-icon>
    </v-btn>
    <v-card>
      <v-toolbar color="indigo" dark dense>
        <v-toolbar-title>KNX-IP-Interface hinzufügen</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="show = false" icon>
          <v-icon>fa-times</v-icon>
        </v-btn>
      </v-toolbar>

      <v-divider/>

      <v-card-text>
        <div class="table-wrapper" v-if="devices.length > 0">
          <v-data-table
            :headers="headers"
            :items="devices"
            :pagination.sync="pagination"
            :rows-per-page-items="rowsPerPageItems"
            item-key="_id"
            rows-per-page-text="Geräte pro Seite:"
          >
            <template slot="items" slot-scope="{ item }">
              <td>
                <v-btn
                  @click="select(item)"
                  icon
                >
                  <v-icon color="grey" v-if="!selected || selected.ID !== item.ID">fa-circle-o</v-icon>
                  <v-icon color="primary" v-else>fa-circle</v-icon>
                </v-btn>
              </td>
              <td>
                {{ item.name }}
                <br/>
                {{ item.description }}
              </td>
              <td>{{ item.address }}</td>
              <td>
                {{ item.product.text }}
                <br/>
                {{ item.product.productFamilyInformation.name }}
              </td>

              <td>
                <v-select
                  :items="item.parameterReferences.map(i => i.parameterValue)"
                  hide-details
                  v-if="selected && selected.address === item.address"
                  v-model="ipAddress"
                ></v-select>
              </td>
            </template>
          </v-data-table>
        </div>

        <v-alert :value="true" v-else>
          <div class="title">
            In diesem ETS-Projekt konnte kein KNX-IP-Router erkannt werden.
          </div>
          <div class="subheading pt-3">
            Entweder Sie fügen in der ETS einen KNX-IP-Router ein und importieren dann das Projekt erneut oder tragen Sie im
            Formular die Daten manuell ein!
          </div>
        </v-alert>

        <div class="pl-4 pb-3 mb-1 pt-2 mt-3 elevation-6" style="border: 2px solid #3f51b5; border-radius: 4px;">
          <v-form
            lazy-validation
            ref="form"
            v-model="valid"
          >
            <v-layout row wrap>
              <v-flex pl-0 pr-2 xs2>
                <v-text-field
                  :rules="[v => !!v || 'Die IP-Adresse / der Host Name wird benötigt!']"
                  label="IP-Adresse / Host Name"
                  v-model="ipAddress"
                  validate-on-blur
                ></v-text-field>
              </v-flex>
              <v-flex pl-2 pr-2 xs2>
                <v-text-field
                  :max="65535"
                  :min="1"
                  :rules="[v => !!v || 'Der Port wird benötigt!']"
                  label="Port"
                  type="number"
                  v-model="port"
                ></v-text-field>
              </v-flex>
              <v-flex pl-2 pr-2 xs2>
                <v-text-field
                  :rules="[v => !!v || 'Der Name wird benötigt!']"
                  label="Name der Schnittstelle"
                  v-model="name"
                ></v-text-field>
              </v-flex>
              <v-flex pl-2 pr-4 xs6>
                <v-text-field
                  label="Beschreibung der Schnittstelle"
                  v-model="description"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </div>
      </v-card-text>

      <v-divider/>

      <v-card-actions class="actions-section pb-3 pr-3">
        <v-spacer/>
        <v-btn
          @click="reset"
          color="error"
          flat
        >
          Abbrechen
        </v-btn>
        <v-btn
          :disabled="!valid"
          @click="submit"
          color="primary"
        >
          Weiter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        getDevices: 'fileUploads/getDevices'
      }),
      devices () {
        if (!this.getDevices) {
          return []
        }

        return this.getDevices.filter(dev => {
          if (!dev || !dev.product || dev.product.text.length < 10) {
            return false
          }

          const searchPhrases = ['ip interface', 'ip-interface', 'ip-router', 'ip router', 'router']

          return searchPhrases.find(o => dev.product.text.toLowerCase().search(o) !== -1)
        })
      }
    },

    data () {
      return {
        show: false,
        selected: null,
        valid: null,
        ipAddress: '',
        port: 3671,
        name: '',
        description: '',
        pagination: {
          rowsPerPage: 10,
          sortBy: 'postCode',
          descending: false
        },
        rowsPerPageItems: [
          { text: '10', value: 10 },
          { text: '20', value: 20 },
          { text: 'Alle', value: -1 },
        ],
        headers: [
          { value: '_id', text: '', sortable: false, width: 40 },
          { value: 'name', text: 'Name und Beschreibung', width: 300 },
          { value: 'address', text: 'Adresse', width: 100 },
          { value: 'product', text: 'Gerätetyp', sortable: false, width: 800 },
          { value: 'parameterReferences', text: 'IP-Adresse / Host Name', sortable: false },
        ],
        showSuggestionsOnly: false,
      }
    },

    methods: {
      ...mapActions({
        add: 'controlSystems/addAction',
      }),
      select (item) {
        this.ipAddress = null
        this.selected = { ...item }
      },
      submit () {
        if (this.$refs.form.validate()) {
          console.log('form is valid')
        }
        const controlSystem = {
          name: this.name,
          description: this.description,
          host: this.ipAddress,
          type: 'KNX-TP',
          port: this.port,
        }

        this.add(controlSystem)
        this.reset()
        this.$router.push('/admin/controls')
      },
      reset () {
        this.$refs.form.reset()
        this.name = ''
        this.description = ''
        this.port = 3671
        this.ipAddress = ''
        this.show = false
      }
    }
  }
</script>

<style scoped>
  .table-wrapper {
    border: 2px solid #ddd;
    border-radius: 4px;
    height: calc(100vh - 370px);
    overflow-y: auto;
  }

  .checkbox {
    width: 40px;
  }
</style>
