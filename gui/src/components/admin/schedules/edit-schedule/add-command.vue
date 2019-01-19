<template>
  <tr v-if="mode === 'standBy'">
    <td>
      <v-btn fab small color="primary" @click="mode = 'add'">
        <v-icon small>fa-plus</v-icon>
      </v-btn>
    </td>
  </tr>
  <tr v-else>
    <td>
      <v-combobox
        v-model="control"
        :items="controlOptions"
        label="Steuerelement"
        item-text="name"
        clearable
      />
    </td>
    <td v-if="control">
      <v-select
        v-model="endpoint"
        :items="control.def.endPoints"
        label="Befehl"
        item-text="label"
        return-object
        clearable
      ></v-select>
    </td>
    <td v-if="endpoint" align="right">
      <SetValue
        :endpoint="endpoint"
        :value="endpoint.defaultValue"
        @setValue="v => { value = v }"
      />
    </td>
    <td class="pt-2" align="center">
      <v-btn
        v-if="value !== null"
        fab
        small
        color="success"
        @click="addCommandToSchedule"
      >
        <v-icon small>fa-save</v-icon>
      </v-btn>
    </td>
  </tr>
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
        value: null,
      }
    },

    methods: {
      addCommandToSchedule () {
        const command = {
          control: this.control._id,
          endpoint: this.endpoint.endPoint,
          value: this.value
        }
        this.$emit('addCommand', command)
        this.mode = 'standBy'
        this.control = null
      }
    },

    watch: {
      control () {
        this.endpoint = null
      },
      endpoint () {
        this.value = null
      }
    }
  }
</script>

<style scoped>
  td {
    padding-right: 30px;
  }

  td:last-child {
    padding-right: 0px;
  }
</style>
