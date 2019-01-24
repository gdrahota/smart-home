<template>
  <v-dialog
    persistent
    :width="1000"
    v-model="show"
  >
    <v-btn
      class="elevation-2 info--text"
      icon
      small
      dark
      outline
      @click="selectSchedule(JSON.parse(JSON.stringify(scheduleToEdit)))" slot="activator"
    >
      <v-icon
        small
        color="info"
        outline
        dark
      >{{ scheduleToEdit._id ? 'fa-cog' : 'fa-plus' }}
      </v-icon>
    </v-btn>

    <v-card v-if="show">
      <v-card-title>
        <span class="headline">Zeitsteuerung {{ schedule._id ? 'anpassen' : 'anlegen' }}</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs4 left>
              <v-text-field
                v-model="schedule.name"
                label="Bezeichnung"
              ></v-text-field>
            </v-flex>
            <v-flex xs8 right>
              <v-text-field
                v-model="schedule.description"
                label="Beschreibung"
              ></v-text-field>
            </v-flex>
            <v-flex xs4 left>
              <v-select
                :items="days"
                v-model="schedule.weekDays"
                item-value="value"
                item-text="text"
                label="Wochentage"
                multiple
              ></v-select>
            </v-flex>
            <v-flex xs4 right>
              Ausschlusstage
            </v-flex>
            <v-flex xs4 right></v-flex>

            <v-flex xs2 left>
              <v-select
                :items="timeTypes"
                v-model="schedule.time"
                item-value="value"
                item-text="text"
                label="Zeitpunkt"
              ></v-select>
            </v-flex>
            <v-flex xs2 left v-if="schedule.time === 'fixed'">
              <v-text-field
                v-model="schedule.timeFixed"
                label="Zeit"
                type="time"
              ></v-text-field>
            </v-flex>
            <v-flex offset-xs1 xs2 left>
              <v-text-field
                v-if="schedule.time !== 'fixed'"
                v-model="schedule.timeOffset"
                label="Verschiebung"
                :min="-180"
                :max="180"
                :step="1"
                type="number"
                suffix="Min."
              ></v-text-field>
            </v-flex>
            <v-flex offset-xs1 xs1 left v-if="schedule.time !== 'fixed'">
              <v-text-field
                v-model="schedule.allowedTimeFrame.from"
                label="Von"
                type="time"
              ></v-text-field>
            </v-flex>
            <v-flex xs1 left v-if="schedule.time !== 'fixed'">
              <v-text-field
                v-model="schedule.allowedTimeFrame.till"
                label="Bis"
                type="time"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-text class="border-top">
        <v-container>
          <table class="table full-width">
            <thead>
            <tr>
              <th quarter>Steuerelement</th>
              <th quarter>Befehl</th>
              <th align="center">Wert</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(command, idx) of schedule.commands">
              <td>{{ getCommandControlName(command.control) }}</td>
              <td>{{ getCommandEndpoint(command) }}</td>
              <td align="right">
                <SetValue
                  :endpoint="getEndpoint(command)"
                  :value="command.value"
                  @setValue="v => { command.value = v }"
                />
              </td>
              <td class="pt-2" align="center">
                <confirm
                  title="Soll dieser Befehl gelöscht werden?"
                  @agree="removeCommand(idx)"
                />
              </td>
            </tr>
            <add-command @addCommand="command => addCommand(command)"/>
            </tbody>
          </table>
        </v-container>
      </v-card-text>

      <v-card-text class="border-top pb-5">
        <v-btn small outline color="primary" class="float-right" @click="save">
          <v-icon left small outline>fa-check</v-icon>
          Speichern
        </v-btn>
        <v-btn small outline color="grey" class="float-right" @click="show = false">
          <v-icon left small outline>fa-times</v-icon>
          Abbrechen
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import AddCommand from './add-command'
  import SetValue from './set-value'

  export default {
    components: {
      AddCommand,
      SetValue,
    },

    computed: {
      ...mapGetters({
        scheduleFromStore: 'schedules/getSelected',
        timeTypes: 'schedules/getTimeTypes',
        controls: 'controls/get',
        controlById: 'controls/getById',
        getDefinitionByName: 'controls/getDefinitionByName',
      }),
      schedule: {
        get () {
          return this.scheduleFromStore
        },
        set () {
        }
      }
    },

    data () {
      return {
        show: false,
        days: [
          { value: 1, text: 'Mo' },
          { value: 2, text: 'Di' },
          { value: 3, text: 'Mi' },
          { value: 4, text: 'Do' },
          { value: 5, text: 'Fr' },
          { value: 6, text: 'Sa' },
          { value: 7, text: 'So' },
        ],
        addControl: null
      }
    },

    methods: {
      ...mapActions({
        saveSchedule: 'schedules/updateAction',
        addSchedule: 'schedules/addAction',
      }),
      ...mapMutations({
        selectSchedule: 'schedules/select'
      }),
      getCommandControlName (controlId) {
        let response = ''
        const control = this.controlById(controlId)
        if (control) {
          response = control.name
          const def = this.getDefinitionByName(control.controlType)
          if (def) {
            response += ' (' + def.label + ')'
          }
        }
        return response
      },
      getCommandEndpoint (command) {
        const control = this.controlById(command.control)
        if (control) {
          const def = this.getDefinitionByName(control.controlType)
          if (def) {
            const endpoint = def.endPoints.find(i => i.endPoint === command.endpoint)
            if (endpoint) {
              return endpoint.label
            }
          }
        }
      },
      getEndpoint (command) {
        const control = this.controlById(command.control)
        if (control) {
          const def = this.getDefinitionByName(control.controlType)
          if (def) {
            return def.endPoints.find(i => i.endPoint === command.endpoint)
          }
        }
      },
      addCommand (command) {
        this.schedule.commands.push(command)
      },
      removeCommand (idx) {
        this.schedule.commands.splice(idx, 1)
      },
      save () {
        if (this.schedule._id) {
          this.saveSchedule(this.schedule)
        } else {
          this.addSchedule(this.schedule)
        }
        this.show = false
      }
    },

    props: {
      scheduleToEdit: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
  .flex.left {
    padding-right: 10px !important;
  }

  .flex.right {
    padding-left: 10px !important;
  }

  th:not([align]) {
    text-align: left;
  }

  td {
    padding-right: 30px;
  }

  td:last-child {
    padding-right: 0px;
  }

  .border-top {
    border-top: 1px solid #ddd;
  }

  [quarter] {
    width: 30%;
  }
</style>
