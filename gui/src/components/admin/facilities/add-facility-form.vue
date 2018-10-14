<template>
  <v-dialog v-model="show" width="500">
    <v-btn slot="activator" fab small @click="show = true">
      <v-icon small color="blue darken-2">fa-plus</v-icon>
    </v-btn>
    <v-form>
      <v-card>
        <v-card-title>
          <div class="headline">Neues Gebäude anlegen</div>
        </v-card-title>
        <v-card-text>
          <v-layout wrap row>
            <v-flex xs3>
              <v-text-field
                v-model="postCode"
                label="Postleitzahl"
              ></v-text-field>
            </v-flex>
            <v-flex xs9 class="pl-2">
              <v-text-field
                v-model="city"
                label="Ort"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="street"
                label="Straße"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn small outline color="grey lighten-1" @click="reset">
            <v-icon small left>fa-times</v-icon>
            <span>Abbrechen</span>
          </v-btn>
          <v-btn small outline color="blue darken-2" @click="submit">
            <v-icon small left>fa-plus</v-icon>
            <span>Hinzufügen</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
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
      submit () {
        const facility = {
          address: {
            postCode: this.postCode,
            city: this.city,
            street: this.street
          },
          attributes: []
        }
        this.$emit('add', facility)
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
