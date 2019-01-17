<template>
  <v-dialog
    persistent-
    :width="800"
    v-model="show"
  >
    <v-btn icon @click="selectSchedule(JSON.parse(JSON.stringify(scheduleToEdit)))" slot="activator">
      <v-icon small color="info">fa-cog</v-icon>
    </v-btn>

    <v-card v-if="show">
      <v-card-title>
        <span class="headline">Zeitsteuerung anpassen</span>
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

            <v-flex xs4 left>
              <v-select
                :items="timeTypes"
                v-model="schedule.time"
                item-value="value"
                item-text="text"
                label="Zeitpunkt"
              ></v-select>
            </v-flex>
            <v-flex xs2 left>
              <v-text-field
                v-model="schedule.timeOffset"
                label="Verschiebung"
                :min="-180"
                :max="180"
                :step="5"
                type="number"
                suffix="Min."
              ></v-text-field>
            </v-flex>
            <v-flex xs1 left>
              <v-text-field
                v-model="schedule.allowedTimeFrame.from"
                label="Von"
                min="0:00"
                type="time"
              ></v-text-field>
            </v-flex>
            <v-flex xs1 left>
              <v-text-field
                v-model="schedule.allowedTimeFrame.till"
                label="Bis"
                min="0:00"
                type="time"
              ></v-text-field>
            </v-flex>
            <v-flex xs4 right></v-flex>

            <v-flex xs12>
              <table class="table full-width">
                <thead>
                <tr>
                  <th>Steuerelement</th>
                  <th>Befehl</th>
                  <th align="center">Wert</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="command of schedule.commands">
                  <td>{{ getCommandControlName(command.control) }}</td>
                  <td>{{ getCommandEndpoint(command) }}</td>
                  <td align="right">
                    <component
                      :is="getValueSetter(command)"
                      :value="command.value"
                      @setValue="v => { command.value = v }"
                    />
                  </td>
                </tr>
                </tbody>
              </table>
              <!--<v-select-->
              <!--:items="controls"-->
              <!--item-text="name"-->
              <!--item-value="_id"-->
              <!--v-model="addControl"-->
              <!--&gt;</v-select>-->
              <!--{{ addControl }}-->
            </v-flex>

            <v-flex xs12>
              <pre>{{ schedule }}</pre>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Slider from './set-value/slider'

  export default {
    components: {
      Slider
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
      getValueSetter (command) {
        const control = this.controlById(command.control)
        if (control) {
          const def = this.getDefinitionByName(control.controlType)
          if (def) {
            const endpoint = def.endPoints.find(i => i.endPoint === command.endpoint)
            if (endpoint) {
              console.log(endpoint)
              switch (endpoint.controlType) {
                case 'slider':
                  return Slider
                default:
                  console.log('nix gefunden für', endpoint.controlType)
              }
            }
          }
        }
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
</style>
