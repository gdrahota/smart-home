<template>
  <v-dialog persistent width="90%" v-model="show">
    <v-btn
      class="elevation-2 info--text"
      icon
      small
      dark
      outline
      @click="selectSchedule(JSON.parse(JSON.stringify(scheduleToEdit)))"
      slot="activator"
    >
      <v-icon small color="info" outline dark>{{ scheduleToEdit._id ? 'fa-cog' : 'fa-plus' }}</v-icon>
    </v-btn>

    <v-card v-if="show">
      <v-card-title>
        <span class="headline">Zeitsteuerung {{ schedule._id ? 'anpassen' : 'anlegen' }}</span>
      </v-card-title>

      <v-card-text>
        <v-card>
          <v-card-text>

            <v-layout wrap row>
              <v-flex xs4>
                <v-text-field
                  v-model="schedule.name"
                  label="Bezeichnung"
                ></v-text-field>
              </v-flex>
              <v-flex xs8>
                <v-text-field v-model="schedule.description" label="Beschreibung"></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout wrap row>
              <v-flex xs3 pr-3>
                <v-select
                  :items="timeTypes"
                  v-model="schedule.time"
                  item-value="value"
                  item-text="text"
                  label="Zeitpunkt"
                ></v-select>
              </v-flex>
              <v-flex xs9></v-flex>
            </v-layout>

            <time-slots
              v-if="schedule.time === 'timeSlots'"
              :schedule="schedule"
              :timeSlots="schedule.timeSlots ? schedule.timeSlots : null"
              @update="timeSlots => { schedule.timeSlots = timeSlots }"
            />

            <fixed-time
              v-if="schedule.time === 'fixed'"
              :schedule="schedule"
              @updateTimeFixed="timeFixed => { schedule.timeFixed = timeFixed }"
              @updateWeekDays="weekDays => { schedule.weekDays = weekDays }"
              @updateExcludeDays="excludeDays => { schedule.excludeDays = excludeDays }"
            />

            <time-functions
              v-if="['sunrise', 'sunset'].indexOf(schedule.time) !== -1"
              :schedule="schedule"
              @updateTimeOffset="offset => { schedule.timeOffset = offset }"
              @updateWeekDays="weekDays => { schedule.weekDays = weekDays }"
              @updateExcludeDays="excludeDays => { schedule.excludeDays = excludeDays }"
              @updateAllowedTimeFrameFrom="from => { schedule.allowedTimeFrame.from = from }"
              @updateAllowedTimeFrameTill="till => { schedule.allowedTimeFrame.till = till }"
            />
          </v-card-text>
        </v-card>
      </v-card-text>

      <v-card-text>
        <list-edit-commands-normal
          v-if="schedule.time !== 'timeSlots'"
          :schedule="schedule"
        />
        <list-edit-commands-time-slots
          v-if="schedule.time === 'timeSlots'"
          :schedule="schedule"
        />
      </v-card-text>

      <v-card-text class="pb-5">
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
  import TimeSlots from './schedule-types/time-slots'
  import FixedTime from './schedule-types/fixed-time'
  import TimeFunctions from './schedule-types/time-functions'
  import ListEditCommandsNormal from './list-edit-commands-normal'
  import ListEditCommandsTimeSlots from './list-edit-commands-time-slots'

  export default {
    components: {
      TimeFunctions,
      FixedTime,
      ListEditCommandsNormal,
      ListEditCommandsTimeSlots,
      TimeSlots,
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
        addControl: null,
        excludeDays: []
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
  .v-card__title {
    background-color: #d28903;
    color: white;
  }

  .flex {
    padding-right: 20px;
  }
</style>
