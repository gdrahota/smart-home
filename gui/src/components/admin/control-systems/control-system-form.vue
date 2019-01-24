<template>
  <v-layout wrap row>
    <v-flex xs1 class="pr-1">
      <v-btn
        icon
        :style="{ left: '-10px' }"
        class="float-right"
        @click.stop="disabled = !disabled"
      >
        <v-icon v-if="disabled">fa-lock</v-icon>
        <v-icon v-else>fa-unlock</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs2 class="pr-1">
      <v-select
        :items="controlSystemTypes"
        v-model="busType"
        :disabled="disabled"
        solo
        @input="value => updateControlSystem('type', value)"
      ></v-select>
    </v-flex>
    <v-flex xs2 class="pr-1">
      <v-text-field
        v-model="name"
        :disabled="disabled"
        solo
        @input="value => updateControlSystem('name', value)"
      ></v-text-field>
    </v-flex>
    <v-flex xs3 class="pr-1">
      <v-text-field
        v-model="description"
        :disabled="disabled"
        solo
        @input="value => updateControlSystem('description', value)"
      ></v-text-field>
    </v-flex>
    <v-flex xs2>
      <v-text-field
        v-model="host"
        :disabled="disabled"
        solo
      ></v-text-field>
    </v-flex>
    <v-flex xs1>
      <v-text-field
        v-model="port"
        :disabled="disabled"
        type="number"
        :min="1"
        :max="65535"
        solo
      ></v-text-field>
    </v-flex>
    <v-flex xs1>
      <v-text-field
        v-model="numberOfControls"
        :disabled="true"
        solo
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        controlSystemTypes: 'controlSystems/getTypes',
        controls: 'controls/getByControlSystemId'
      }),
      busType: {
        get () {
          return this.controlSystem.type
        },
        set () {}
      },
      name: {
        get () {
          return this.controlSystem.name
        },
        set () {}
      },
      host: {
        get () {
          return this.controlSystem.host
        },
        set () {}
      },
      port: {
        get () {
          return this.controlSystem.port
        },
        set () {}
      },
      description: {
        get () {
          return this.controlSystem.description
        },
        set () {}
      },
      numberOfControls: {
        get () {
          return this.controls(this.controlSystem._id).length
        }
      }
    },

    data () {
      return {
        disabled: true
      }
    },

    methods: {
      ...mapActions({
        update: 'controlSystems/updateAction'
      }),
      updateControlSystem (attrName, value) {
        const changed = {
          ...this.controlSystem,
          [attrName]: value
        }
        this.update(changed)
      }
    },

    props: {
      controlSystem: {
        type: Object,
        required: true
      }
    }
  }
</script>
