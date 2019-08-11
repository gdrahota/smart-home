<template>
  <div>
    <v-btn
      :style="{ top: '5px' }"
      @click="show = true"
      absolute
      class="elevation-2"
      color="primary"
      dark
      fab
      right
      small
      top
    >
      <v-icon>fa-plus</v-icon>
    </v-btn>
    <v-dialog v-model="show" width="500">
      <v-form>
        <v-card>
          <v-card-title>
            <div class="headline">Neues Gebäude anlegen</div>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field
                  label="Postleitzahl"
                  v-model="postCode"
                ></v-text-field>
              </v-flex>
              <v-flex class="pl-2" xs9>
                <v-text-field
                  label="Ort"
                  v-model="city"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Straße"
                  v-model="street"
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
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        show: this.showDialog,
        postCode: '',
        city: '',
        street: ''
      }
    },

    methods: {
      ...mapActions({
        add: 'facilities/addAction',
      }),
      submit () {
        const facility = {
          address: {
            postCode: this.postCode,
            city: this.city,
            street: this.street
          },
          attributes: []
        }
        this.add(facility)
        this.reset()
      },
      reset () {
        this.postCode = ''
        this.city = ''
        this.street = ''
        this.show = false
      }
    }
  }
</script>
