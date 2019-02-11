<template>
  <tr>
    <td>
      <v-switch
        :disabled="thereAreNoMoreAdminsBesidesThisOne"
        v-model="item.state"
        false-value="disabled"
        true-value="active"
        :label="stateLabel(item.state)"
        hide-details
        color="green"
        @change="() => save(item)"
      ></v-switch>
    </td>
    <td>{{ item.accountName }}</td>
    <td>
      <v-edit-dialog
        :return-value.sync="item.firstName"
        lazy
        @save="save"
      >
        {{ item.firstName }}
        <v-text-field
          slot="input"
          v-model="item.firstName"
          :rules="[]"
          single-line
          counter
        ></v-text-field>
      </v-edit-dialog>
    </td>
    <td>
      <v-edit-dialog
        :return-value.sync="item.lastName"
        lazy
        @save="save"
      >
        {{ item.lastName }}
        <v-text-field
          slot="input"
          v-model="item.lastName"
          :rules="[]"
          single-line
          counter
        ></v-text-field>
      </v-edit-dialog>
    </td>
    <td>
      <v-switch
        :disabled="thereAreNoMoreAdminsBesidesThisOne"
        v-model="item.groups"
        value="GlobalAdmin"
        :label="isAdminLabel"
        hide-details
        color="primary"
        @change="() => save(item)"
      ></v-switch>
    </td>
    <td>
      <template v-if="item.lastLoginAt">
        {{ $moment(item.lastLoginAt).format('DD.MM.YYYY') }} / {{ $moment(item.lastLoginAt).format('HH:mm:ss') }} Uhr
      </template>
    </td>
  </tr>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        users: 'users/get',
        stateLabel: 'users/getStateLabel',
      }),
      isAdminLabel () {
        return this.item.groups.find(group => group === 'GlobalAdmin') ? 'Ja' : 'Nein'
      },
      thereAreNoMoreAdminsBesidesThisOne () {
        if (this.item.groups.indexOf('GlobalAdmin') === -1) {
          return false
        }

        const numberOfOtherAdmins = this.users
          .filter(user => user._id !== this.item._id)
          .filter(user => user.state === 'active')
          .filter(user => user.groups.find(group => group === 'GlobalAdmin'))
          .length

        return numberOfOtherAdmins === 0
      }
    },

    methods: {
      ...mapActions({
        update: 'users/updateAction',
      }),
      save () {
        this.update(this.item)
        this.$emit('showSnack', { snackColor: 'success', snackText: 'Änderungen wurden gespeichert' })
      },
    },

    props: {
      item: {
        type: Object,
        required: true
      }
    },
  }
</script>

<style scoped>
  td {
    width: calc(16.6% - 5px);
  }

  td:first-child {
    width: 20px;
  }
</style>
