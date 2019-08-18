<template>
  <v-dialog
    persistent
    v-model="show"
    width="800"
  >
    <v-btn
      class="elevation-2"
      fab
      slot="activator"
      small
      v-if="!disabled"
    >
      <v-icon color="green darken-1" small>fa-plus</v-icon>
    </v-btn>
    <v-form>
      <v-card>
        <v-card-title>
          <div class="headline">Neues Steuerelement anlegen</div>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <v-select
                :items="items"
                item-text="name"
                item-value="_id"
                label="Anlage"
                v-model="facilityId"
              ></v-select>
            </v-flex>

            <v-flex class="pr-2" xs5>
              <v-select
                :items="controlTypes"
                item-text="label"
                item-value="type"
                label="Art des Steuerelements"
                v-model="controlType"
              ></v-select>
            </v-flex>
            <v-flex class="pr-2" xs3>
              <v-text-field
                label="Bezeichnung"
                v-model="name"
              ></v-text-field>
            </v-flex>
            <v-flex class="pl-2" xs4>
              <v-text-field
                label="Beschreibung"
                v-model="description"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="reset"
            color="grey lighten-1"
            outline
            small
          >
            <v-icon left small>fa-times</v-icon>
            <span>Abbrechen</span>
          </v-btn>
          <v-btn
            @click="submit"
            color="blue darken-2"
            outline
            small
          >
            <v-icon left small>fa-plus</v-icon>
            <span>Hinzufügen</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        facilities: 'facilities/getActive',
        controlTypeDefinitions: 'controlDefinitions/get',
      }),
      items () {
        return this.facilities.map(i => {
          return {
            _id: i._id,
            name: i.address.postCode + ' ' + i.address.city + ', ' + i.address.street
          }
        })
      },
      controlTypes () {
        return this.controlTypeDefinitions.map(def => {
          return {
            label: def.label,
            type: def.name,
          }
        })
      }
    },

    data () {
      return {
        show: this.showDialog,
        facilityId: null,
        controlType: null,
        name: '',
        description: ''
      }
    },

    methods: {
      submit () {
        const control = {
          facilityId: this.facilityId,
          controlType: this.controlType,
          name: this.name,
          description: this.description,
          endPoints: [],
          attributeValues: []
        }
        this.$emit('add', control)
        this.reset()
      },
      reset () {
        this.facilityId = null
        this.controlType = null
        this.name = ''
        this.description = ''
        this.show = false
      }
    },

    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
