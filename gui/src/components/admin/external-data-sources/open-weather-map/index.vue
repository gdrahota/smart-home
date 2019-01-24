<template>
  <v-card>
    <v-card-title>
      <div class="subheading">OpenWeatherMap Konfiguration</div>
    </v-card-title>
    <v-card-text v-if="item">
      <v-layout wrap row>
        <v-flex xs3>
          <v-text-field
            v-model="item.name"
            label="Bezeichnung"
          />
        </v-flex>
        <v-flex xs6 class="pl-3">
          <v-text-field
            v-model="item.config.apiKey"
            label="OpenWeatherMap API-Key"
            hint="Parameter: appid"
          />
        </v-flex>
        <v-flex xs3 class="pl-3">
          <v-text-field
            v-model="item.config.cityId"
            label="City Id"
            hint="Parameter: id"
          />
        </v-flex>
        <v-flex xs2>
          <v-chip label class="mt-3">Ausführung alle:</v-chip>
        </v-flex>
        <v-flex xs1>
          <v-text-field
            v-model="item.pollInterval.interval"
            label="Interval"
            type="number"
            :min="1"
          />
        </v-flex>
        <v-flex xs2 class="pl-2">
          <v-select
            :items="timeIntervalUnits"
            v-model="item.pollInterval.unit"
            label="Zeiteinheit"
          />
        </v-flex>
        <v-flex xs7 class="pl-2">
          <v-select
            :items="controls"
            v-model="item.commands"
            label="Versand an"
            item-text="name"
            item-value="_id"
            multiple
            clearable
          ></v-select>
        </v-flex>
      </v-layout>
      <div>
        <a :href="url" target="_blank" rel="noopener noreferrer">{{ url }}</a>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="save">
        Speichern
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        getItems: 'externalDataSources/get',
        getByControlType: 'controls/getByControlType',
      }),
      controls () {
        return this.getByControlType('14CharTextDisplay')
      },
      url () {
        return 'https://api.openweathermap.org/data/2.5/weather?appid=' +
          this.item.config.apiKey +
          '&id=' + this.item.config.cityId +
          '&units=metric'
      },
    },

    created () {
      const item = this.getItems.find(i => i._id === this.$route.params.id)
      if (item) {
        this.fetchData(item)
      }
    },

    data () {
      return {
        item: {
          _id: '',
          name: '',
          type: 'openWeatherMap',
          pollInterval: {
            interval: 1,
            unit: null
          },
          config: {
            apiKey: null,
            cityId: null
          },
          commands: [],
          active: false
        },
        timeIntervalUnits: [
          { text: 'Tage', value: 'day' },
          { text: 'Stunden', value: 'hour' },
          { text: 'Minuten', value: 'minute' },
        ]
      }
    },

    methods: {
      ...mapActions({
        update: 'externalDataSources/updateAction'
      }),
      fetchData (current) {
        if (!current) {
          return false
        }

        this.item._id = current._id
        this.item.name = current.name
        this.item.type = 'openWeatherMap'
        this.item.pollInterval = current.pollInterval
        this.item.config = current.config
        this.item.commands = current.commands
        this.item.active = current.active
      },
      save () {
        this.update(this.item)
      }
    },

    watch: {
      '$route.params.id' (routeId) {
        const item = this.getItems.find(i => i._id === routeId)
        if (item) {
          this.fetchData(item)
        }
      },
      getItems (items) {
        const item = items.find(item => item._id === this.$route.params.id)
        if (item) {
          this.fetchData(item)
        }
      }
    }
  }
</script>
