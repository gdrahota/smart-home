<template>
  <v-card>
    <v-card-text>
      <v-layout wrap row class="subheading pb-2 pt-2">
        <v-flex xs3 pr-3>Steuerelement</v-flex>
        <v-flex xs2 pr-3>Befehl</v-flex>
        <v-flex xs6 pr-3>Wert</v-flex>
        <v-flex xs1></v-flex>
      </v-layout>

      <v-layout v-for="(command, idx) of schedule.commands" :key="'c' + idx" wrap row command>
        <v-flex xs3 pr-3><span>{{ getCommandControlName(command.control) }}</span></v-flex>
        <v-flex xs2 pr-3><span>{{ getCommandEndpoint(command) }}</span></v-flex>
        <v-flex xs6 pr-3>
          <SetValue
            :endpoint="getEndpoint(command)"
            :value="command.value"
            defaultValueName="defaultValue"
            @setValue="v => { command.value = v }"
          />
        </v-flex>
        <v-flex xs1>
          <confirm
            title="Soll dieser Befehl gelöscht werden?"
            @agree="removeCommand(idx)"
          />
        </v-flex>
      </v-layout>

      <add-command @addCommand="command => addCommand(command)"/>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import AddCommand from './add-command-normal'
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
    },

    props: {
      schedule: {
        type: Object,
        required: true,
      }
    }
  }
</script>

<style scoped>
  .subheading {
    background-color: #666;
    color: white;
    font-weight: bold;
    padding: 5px;
  }

  .command:nth-child(odd) {
    background-color: #eee;
  }

  .command > .flex {
    padding: 5px;
  }

  .command > .flex > span {
    position: relative;
    top: 10px;
  }
</style>
