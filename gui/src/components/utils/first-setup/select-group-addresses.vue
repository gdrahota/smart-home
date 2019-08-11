<template>
  <div>
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
            <v-checkbox></v-checkbox>
            <!--            <v-btn fab small>-->
            <!--              <v-icon>fa-check</v-icon>-->
            <!--            </v-btn>-->
          </th>
          <th>Adresse</th>
          <th>Name</th>
          <th>DPT</th>
          <th>Name</th>
          <th>Text</th>
          <th>Untertyp</th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="ga of groupAddresses"
        >
          <td class="check">
            <v-checkbox
              hide-details
              v-model="ga.selected"
            ></v-checkbox>
          </td>
          <td v-text="ga.address"></td>
          <td v-text="ga.name"></td>
          <template v-if="ga.dataPointType">
            <td v-text="ga.dataPointType.ID"></td>
            <td v-text="ga.dataPointType.name"></td>
            <td v-text="ga.dataPointType.text"></td>
            <template v-if="ga.dataPointType.subtype">
              <td v-text="ga.dataPointType.subtype.subDptText"></td>
            </template>
            <template v-else>
              <td>&nbsp;</td>
            </template>
          </template>
          <template v-else>
            <td colspan="4">&nbsp;</td>
          </template>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
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
      }
    },

    data () {
      return {
        showUsedAddressesOnly: true,
      }
    },
  }
</script>


<style scoped>
  #wrapper {
    max-height: calc(100vh - 355px);
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
    background-color: rgba(30, 136, 229, 1);
    color: #fff;
  }

  td {
    border-bottom: 1px solid #ddd;
  }
</style>
