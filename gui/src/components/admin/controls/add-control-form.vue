<template>
  <v-dialog v-model="show" width="800">
    <v-btn
      slot="activator"
      fab
      small
      @click="show = true"
      class="elevation-2"
    >
      <v-icon small color="green darken-1">fa-plus</v-icon>
    </v-btn>
    <v-form>
      <v-card>
        <v-card-title>
          <div class="headline">Neues Steuerelement anlegen</div>
        </v-card-title>
        <v-card-text>
          <v-layout wrap row>
            <v-flex xs12>
              <v-select
                :items="items"
                v-model="facilityId"
                item-text="name"
                item-value="_id"
                label="Gebäude"
              />
            </v-flex>

            <v-flex xs5 class="pr-2">
              <v-select
                :items="types"
                v-model="type"
                item-text="label"
                item-value="type"
                label="Typ"
              />
            </v-flex>
            <v-flex xs3 class="pr-2">
              <v-text-field
                v-model="name"
                label="Bezeichnung"
              ></v-text-field>
            </v-flex>
            <v-flex xs4 class="pl-2">
              <v-text-field
                v-model="description"
                label="Beschreibung"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn
            small
            outline
            color="grey lighten-1"
            @click="reset"
          >
            <v-icon small left>fa-times</v-icon>
            <span>Abbrechen</span>
          </v-btn>
          <v-btn
            small
            outline
            color="blue darken-2"
            @click="submit"
          >
            <v-icon small left>fa-plus</v-icon>
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
        facilities: 'facilities/getActive'
      }),
      items () {
        return this.facilities.map(i => {
          return {
            _id: i._id,
            name: i.address.postCode + ' ' + i.address.city + ', ' + i.address.street
          }
        })
      }
    },

    data () {
      return {
        show: this.showDialog,
        facilityId: null,
        type: null,
        name: '',
        description: '',
        types: [
          { label: 'Licht (an/aus)', type: 'lightSwitch' },
          { label: 'Licht (dimmbar)', type: 'lightDimmer' },
          { label: 'Rollladen', type: 'blinds' }
        ]
      }
    },

    methods: {
      submit () {
        const control = {
          address: {
            facilityId: this.facilityId,
            type: this.type,
            name: this.name,
            description: this.description
          },
          attributeValues: []
        }
        this.$emit('add', control)
        this.reset()
      },
      reset () {
        this.name = ''
        this.description = ''
        this.type = null
        this.show = false
      }
    }
  }
</script>
