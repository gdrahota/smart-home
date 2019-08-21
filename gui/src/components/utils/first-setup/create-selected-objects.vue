<template>
  <v-card>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <template slot="header">
          <div class="title">Gebäude</div>
        </template>
        <v-card v-if="facility">
          <v-card-text v-if="facility">
            {{ facility.address.postCode }} {{ facility.address.city }}, {{ facility.address.street }}
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <template slot="header">
          <div class="title">{{ setup.roomNames ? setup.roomNames.length : 0 }} Räume</div>
        </template>
        <v-card v-if="setup.roomNames">
          <v-card-text>
            <v-chip
              :key="roomIdx"
              color="secondary"
              dark
              label
              outline
              v-for="(roomName, roomIdx) in setup.roomNames"
            >
              {{ roomName }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <template slot="header">
          <div class="title">KNX-IP-Schnittstelle</div>
        </template>
        <v-card v-if="controlSystem">
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs2>Bezeichnung:</v-flex>
              <v-flex xs10>{{ controlSystem.name }}</v-flex>

              <v-flex xs2>IP-Adresse/Host-Name:</v-flex>
              <v-flex xs10>{{ controlSystem.host }}</v-flex>

              <v-flex xs2>Port-Nummer:</v-flex>
              <v-flex xs10>{{ controlSystem.port }}</v-flex>

              <template v-if="controlSystem.description">
                <v-flex xs2>Beschreibung:</v-flex>
                <v-flex xs10>{{ controlSystem.description }}</v-flex>
              </template>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <template slot="header">
          <div class="title">{{ setup.groupAddresses ? setup.groupAddresses.length : 0 }} Gruppenadressen</div>
        </template>
        <v-card class="test" v-if="setup.groupAddresses">
          <v-card-text>
            <v-chip
              :key="roomIdx"
              color="secondary"
              outline
              v-for="(groupAddress, roomIdx) in setup.groupAddresses"
            >
              <v-avatar class="secondary white--text group-address">{{ groupAddress.address }}</v-avatar>
              {{ groupAddress.description }} (DPT {{ groupAddress.dataType }})
            </v-chip>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-card-actions class="actions-section">
      <v-spacer></v-spacer>
      <v-btn
        @click="$emit('cancel')"
        color="error"
        flat
      >
        Abbrechen
      </v-btn>

      <v-btn
        @click="$emit('save')"
        color="primary"
        pr-5
      >
        alles übernehmen
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        facilityById: 'facilities/getById',
        controlSystemById: 'controlSystems/getById',
      }),
      facility () {
        return this.facilityById(this.setup.facilityId)
      },
      controlSystem () {
        return this.controlSystemById(this.setup.knxIpInterface)
      }
    },

    props: {
      setup: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
  .group-address {
    border-radius: unset;
    width: 55px !important;
    text-align: left;
  }

  .test {
    max-height: 400px;
    overflow-y: auto;
  }
</style>
