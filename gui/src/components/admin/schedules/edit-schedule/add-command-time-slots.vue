<template>
  <v-layout wrap row pl-1>
    <v-flex xs12 v-if="mode === 'standBy'">
      <v-btn fab small color="primary" @click="mode = 'add'">
        <v-icon small>fa-plus</v-icon>
      </v-btn>
    </v-flex>

    <template v-else>
      <v-flex xs3 pr-3>
        <v-combobox
          v-model="control"
          :items="controlOptions"
          label="Steuerelement"
          item-text="name"
          clearable
        ></v-combobox>
      </v-flex>
      <v-flex xs2 v-if="control" pr-3>
        <v-select
          v-model="endpoint"
          :items="control.def.endPoints"
          label="Befehl"
          item-text="label"
          return-object
          clearable
        ></v-select>
      </v-flex>

      <v-flex xs3 v-if="endpoint" align="right" pr-3 set-value>
        <SetValue
          :endpoint="endpoint"
          :value="maxValue"
          defaultValueName="max"
          @setValue="v => setValue('maxValue', v)"
        />
      </v-flex>

      <v-flex xs3 v-if="endpoint" align="right" pr-3 set-value>
        <SetValue
          :endpoint="endpoint"
          :value="minValue"
          defaultValueName="min"
          @setValue="v => setValue('minValue', v)"
        />
      </v-flex>

      <v-flex xs1 align="center">
        <v-btn
          v-if="maxValue !== null && minValue !==  null"
          fab
          small
          color="success"
          @click="addCommandToSchedule"
        >
          <v-icon small>fa-save</v-icon>
        </v-btn>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SetValue from './set-value'

  export default {
    components: {
      SetValue
    },

    computed: {
      ...mapGetters({
        controls: 'controls/get',
        controlById: 'controls/getById',
        getDefinitionByName: 'controls/getDefinitionByName',
      }),
      controlOptions () {
        return this.controls.map(c => {
          const def = this.getDefinitionByName(c.controlType)
          const response = {
            _id: c._id,
            name: c.name + ' (' + def.label + ')',
            def
          }
          return response
        })
      },
    },

    data () {
      return {
        mode: 'standBy',
        control: null,
        endpoint: null,
        minValue: null,
        maxValue: null,
      }
    },

    methods: {
      addCommandToSchedule () {
        const command = {
          control: this.control._id,
          endpoint: this.endpoint.endPoint,
          minValue: this.minValue,
          maxValue: this.maxValue,
        }
        this.$emit('addCommand', command)
        this.mode = 'standBy'
        this.control = null
      },
      setValue (minMaxValueName, value) {
        this[minMaxValueName] = value
      }
    },

    watch: {
      control () {
        this.endpoint = null
      },
      endpoint () {
        this.minValue = null
        this.maxValue = null
      }
    }
  }
</script>

<style scoped>
  .set-value {
    position: relative;
    top: 10px;
  }
</style>
