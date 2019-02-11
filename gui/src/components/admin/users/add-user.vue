<template>
  <v-dialog
    v-model="show"
    :width="315"
  >
    <v-btn
      slot="activator"
      @click=""
      color="primary"
      outline
      small
    >
      <v-icon small left>fa-plus</v-icon>
      Benutzer hinzufügen
    </v-btn>

    <v-card>
      <v-card-title>
        <div class="headline">Neuen Benutzer anlegen</div>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="formValidity"
          lazy-validation
        >
          <v-text-field
            v-model="accountName"
            label="Anmeldename"
            counter="20"
            :rules="accountNameRules"
          ></v-text-field>
          <v-text-field
            v-model="firstName"
            label="Vorname"
            counter="20"
            :rules="firstNameRules"
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            label="Nachname"
            counter="20"
            :rules="lastNameRules"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Kennwort"
            counter="20"
            :rules="passwordRules"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="cancel">
          <v-icon left>fa-times</v-icon>
          Abbrechen
        </v-btn>
        <v-btn @click="save" :disabled="!formValidity">
          <v-icon left>fa-save</v-icon>
          Speichern
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      users: 'users/get',
    })
  },

  data () {
    return {
      show: false,
      formValidity: true,
      accountName: '',
      accountNameRules: [
        v => this.isAccountNameFree(v) === true || 'Anmeldename bereits vergeben',
        v => v.length >= 5 || 'Min. 5 Zeichen',
      ],
      firstName: '',
      firstNameRules: [v => v.length >= 2 || 'Min.2  Zeichen'],
      lastName: '',
      lastNameRules: [v => v.length >= 2 || 'Min. 2 Zeichen'],
      password: '',
      passwordRules: [
        v => v.length >= 6 || 'Min. 6 Zeichen',
      ],
    }
  },

  methods: {
    ...mapActions({
      add: 'users/addAction'
    }),
    isAccountNameFree (accountName) {
      return !this.users.find(user => user.accountName === accountName)
    },
    save () {
      if (this.$refs.form.validate()) {
        const user = {
          accountName: this.accountName,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
          groups: [],
          state: 'active',
        }
        this.add(user)
        this.cancel()
      }
    },
    cancel () {
      this.show = false
      this.accountName = ''
      this.firstName = ''
      this.lastName = ''
      this.password = ''
      this.$refs.form.resetValidation()
    }
  }
}
</script>
