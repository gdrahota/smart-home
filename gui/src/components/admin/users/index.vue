<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      rows-per-page-text="Benutzer per Seite"
      must-sort
      item-key="_id"
    >
      <user
        slot="items"
        slot-scope="props"
        :item="props.item"
        @showSnack="snack => showSnack(snack)"
      />
      <template slot="footer">
        <tr style="background-color: #eee;">
          <td colspan="6">
            <add-user></add-user>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">Schließen</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import AddUser from './add-user'
  import User from './user'

  export default {
    components: {
      AddUser,
      User,
    },

    computed: {
      ...mapGetters({
        users: 'users/get',
      }),
    },

    data () {
      return {
        user: null,
        items: [],
        headers: [
          {
            text: 'Status',
            align: 'left',
            sortable: false,
            value: 'state'
          },
          {
            text: 'Anmeldename',
            align: 'left',
            sortable: true,
            value: 'accountName'
          },
          {
            text: 'Vorname',
            align: 'left',
            sortable: true,
            value: 'firstName'
          },
          {
            text: 'Nachname',
            align: 'left',
            sortable: true,
            value: 'lastName'
          },
          {
            text: 'Ist Admin',
            align: 'left',
            sortable: false,
            value: 'groups'
          },
          {
            text: 'Zuletzt angemeldet',
            align: 'left',
            sortable: true,
            value: 'lastLoginAt'
          },
        ],
        snack: false,
        snackColor: '',
        snackText: '',
      }
    },

    methods: {
      ...mapActions({
        update: 'users/updateAction',
      }),
      showSnack (snack) {
        this.snackColor = snack.snackColor
        this.snackText = snack.snackText
        this.snack = true
      }
    },
  }
</script>
