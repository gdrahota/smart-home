<template>
  <v-layout wrap row>
    <v-flex xs1>
      <v-btn
        @click.stop="state.action"
        class="float-right elevation-1 ml-0"
        :color="state.color"
        fab
        small
        dark
      >
        <v-icon color="white" small v-text="state.icon"/>
      </v-btn>

      <confirm
        v-if="!disabled || addNew"
        title="Bussystem löschen"
        :description="'Wollen Sie das Bussystem mit dem Namen <b>' + name + '</b> löschen?'"
        @agree="removeOrCancel"
        fab
        small
        dark
        icon="fa-trash"
      />
    </v-flex>
    <v-flex xs2 class="pr-1" v-if="controlSystem || addNew">
      <v-select
        v-model="type"
        :items="controlSystemTypes"
        :disabled="disabled"
        @input="value => updateControlSystem('type', value)"
        solo
      ></v-select>
    </v-flex>
    <v-flex xs2 class="pr-1" v-if="controlSystem || addNew">
      <v-text-field
        v-model="name"
        :disabled="disabled"
        @input="value => updateControlSystem('name', value)"
        solo
      ></v-text-field>
    </v-flex>
    <v-flex xs2 v-if="controlSystem || addNew">
      <v-text-field
        v-model="host"
        :disabled="disabled"
        @input="value => updateControlSystem('host', value)"
        mask="###.###.###.###"
        placeholder="___.___.___.___"
        return-masked-value
        solo
      ></v-text-field>
    </v-flex>
    <v-flex xs1 v-if="controlSystem || addNew">
      <v-text-field
        v-model="port"
        :disabled="disabled"
        @input="value => updateControlSystem('port', value)"
        type="number"
        :min="1"
        :max="65535"
        solo
      ></v-text-field>
    </v-flex>
    <v-flex xs3 class="pr-1" v-if="controlSystem || addNew">
      <v-text-field
        v-model="description"
        :disabled="disabled"
        @input="value => updateControlSystem('description', value)"
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
      }),
      state () {
        if (this.controlSystem) {
          if (this.disabled) {
            return {
              icon: 'fa-lock',
              color: '#666',
              action: () => {
                this.disabled = false
              }
            }
          } else {
            return {
              icon: 'fa-save',
              color: 'orange',
              action: () => {
                const changed = {
                  type: this.type,
                  name: this.name,
                  host: this.host,
                  port: this.port,
                  description: this.description,
                }
                this.update(changed)
                this.disabled = true
              }
            }
          }
        } else {
          if (this.addNew) {
            return {
              icon: 'fa-save',
              color: 'orange',
              action: () => {
                // add new
                const newItem = {
                  type: this.type,
                  name: this.name,
                  host: this.host,
                  port: this.port,
                  description: this.description,
                }
                this.add(newItem)
                this.addNew = false
              }
            }
          } else {
            return {
              icon: 'fa-plus',
              color: 'primary',
              action: () => {
                this.showAddNew()
              }
            }
          }
        }
      }
    },

    data () {
      const response = {
        addNew: false,
        disabled: true,
        type: null,
        name: '',
        host: '',
        port: 3671,
        description: ''
      }

      if (this.controlSystem) {
        response.type = this.controlSystem.type
        response.name = this.controlSystem.name
        response.host = this.controlSystem.host
        response.port = this.controlSystem.port
        response.description = this.controlSystem.description
      }

      return response
    },

    methods: {
      ...mapActions({
        add: 'controlSystems/addAction',
        update: 'controlSystems/updateAction',
        remove: 'controlSystems/removeAction',
      }),
      updateControlSystem (attrName, value) {
        const changed = {
          ...this.controlSystem,
          [attrName]: value
        }
        this.update(changed)
      },
      removeOrCancel () {
        if (this.controlSystem) {
          this.remove(this.controlSystem._id)
        } else {
          this.addNew = false
        }
      },
      showAddNew () {
        this.addNew = true
        this.disabled = false
        this.type = this.controlSystemTypes[0]
      },
    },

    props: {
      controlSystem: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>
