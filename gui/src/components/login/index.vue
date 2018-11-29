<template>
  <v-container fluid fill-height id="login">
    <v-layout align-center justify-center>
      <v-flex xs4>
        <v-card class="elevation-12 pt-5 pr-4 pb-5 pl-4" id="card-login">
          <v-card-title class="title">Anmelden bei Smart Home (lokal)</v-card-title>
          <v-alert color="error" :value="error" transition="scale-transition">{{ error }}</v-alert>
          <v-card-text>
            <v-form @submit.prevent="doLogin">
              <v-text-field
                v-model="username"
                name="login"
                label="Anmeldename"
                type="text"
                autofocus
              />
              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                name="password"
                label="Kennwort"
              />
              <v-card-actions>
                <v-layout row wrap class="pl-2 pr-2">
                  <v-flex xs6>
                    <div class=".body-1 grey--text text--darken-1">Abmeldung erfolgt automatisch nach 12 Stunden oder durch Schließen des
                      Browsers.
                    </div>
                  </v-flex>
                  <v-flex xs2></v-flex>
                  <v-flex xs4 class="text-xs-right">
                    <v-btn large color="primary" type="submit">Anmelden</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        error: 'client/getError'
      })
    },

    data () {
      return {
        showPassword: false,
        username: '',
        password: ''
      }
    },
    methods: {
      ...mapActions({
        login: 'client/loginAction'
      }),

      doLogin () {
        const payload = {
          username: this.username,
          password: this.password
        }
        this.login(payload)
      }
    }
  }
</script>
