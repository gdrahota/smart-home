<template>
  <div v-if="projectGroupAddresses">
    <v-switch
      :label="switchLabel" class="pl-2"
      color="warning"
      v-model="showUsedAddressesOnly"
    />

    <div id="wrapper">
      <table class="full-width">
        <thead>
        <tr>
          <th class="check">
            <v-checkbox
              :indeterminate="indeterminate"
              hide-details
              v-model="toggleAll"
            />
          </th>
          <th>Adresse</th>
          <th>Name</th>
          <th>DPT</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="ga of groupAddresses">
          <select-group-address :address="ga.address"/>
        </template>
        </tbody>
      </table>
    </div>

    <v-divider></v-divider>

    <div class="pt-3">
      <v-btn
        :disabled="!projectGroupAddresses || !projectGroupAddresses.some(i => i.selected)"
        @click="continueToNextStep"
        class="right"
        color="primary"
      >
        Ausgewählte Übernehmen
      </v-btn>
      <v-btn
        @click="cancel"
        class="right"
        color="error"
        flat
      >
        Nichts übernehmen
      </v-btn>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SelectGroupAddress from './select-group-address'

  export default {
    components: {
      SelectGroupAddress,
    },

    computed: {
      ...mapGetters({
        projectGroupAddresses: 'fileUploads/getProjectGroupAddresses',
      }),
      groupAddresses () {
        if (this.showUsedAddressesOnly && this.projectGroupAddresses) {
          return this.projectGroupAddresses.filter(ga => ga.dataPointType)
        }
        return this.projectGroupAddresses
      },
      switchLabel () {
        const numberOfGroupAddresses = this.groupAddresses ? '(' + this.groupAddresses.length + ') ' : ''

        return (this.showUsedAddressesOnly ?
            'Nur verwendete ' :
            'Alle im Projekt definierten '
        ) + numberOfGroupAddresses + 'Adressen werden angezeigt'
      },
      toggleAll: {
        get () {
          if (!this.groupAddresses) {
            return false
          }

          return this.groupAddresses.every(i => i.selected)
        },
        set (newValue) {
          this.groupAddresses.forEach(i => i.selected = newValue)
        }
      },
      indeterminate () {
        if (!this.groupAddresses) {
          return false
        }

        return !this.groupAddresses.every(i => i.selected) && this.groupAddresses.some(i => i.selected)
      }
    },

    data () {
      return {
        showUsedAddressesOnly: true,
      }
    },

    methods: {
      continueToNextStep () {
        const transformIntoGroupAddress = etsGroupAddress => {
          return {
            etsId: etsGroupAddress.ID,
            address: etsGroupAddress.address,
            description: etsGroupAddress.name,
            dataType: etsGroupAddress.dataPointType,
          }
        }

        this.$emit('addGroupAddresses', this.groupAddresses.filter(ga => ga.selected).map(transformIntoGroupAddress))
      },
      cancel () {
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped>
  #wrapper {
    max-height: calc(100vh - 420px);
    overflow-y: auto;
  }

  table {
    border-spacing: unset;
    border: 1px solid #ddd;
  }

  th, td:not(.check) {
    padding: 10px;
  }

  .check > * {
    position: relative;
    top: -5px;
  }

  .check {
    padding: 0 10px 10px 20px;
  }

  th {
    text-align: left;
    vertical-align: top;
    background-color: #eee;
    color: #666;
    font-size: 17px;
  }

  td {
    border-bottom: 1px solid #ddd;
  }
</style>
