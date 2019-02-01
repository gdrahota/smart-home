<template>
  <v-card>
    <control-header
      left-icon="fa-bars"
      :left-icon-color="getColor"
      :label="control.name"
      :control="control"
    />
    <v-card-text>
      <div class="mt-0 pt-0 pr-1 caption grey--text hidden-xs-only">
        <span v-if="updatedAt" class="float-right">{{ $moment(updatedAt).format('DD.MM.YY / HH:mm:ss') }}</span>
      </div>
      <br/>
      <v-select
        v-model="setValue"
        :items="options"
        item-text="text"
        item-value="value"
        label="Position"
        hide-details
      >
        <template slot="selection" slot-scope="{ item }">
          <span :step="item.value" outline>{{ item.text }}</span>
        </template>
      </v-select>
      <v-chip
        :value="isWindowOpen === true"
        color="rgb(193, 1, 1)"
        label
        class="full-width ml-0 mt-2"
        outline
      >
        <v-avatar>
          <v-icon small>fa-exclamation</v-icon>
        </v-avatar>
        Fenster offen
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapActions } from 'vuex'
  import ControlHeader from '../control-header'

  export default {
    components: {
      ControlHeader,
    },

    computed: {
      getCurrentValueObj () {
        const valueObj = this.control.values['shutter-position-response']
          ? this.control.values['shutter-position-response']
          : this.control.values['shutter-position-set']

        if (valueObj !== null && valueObj !== undefined) {
          return valueObj
        }
        return { value: 0 }
      },
      setValue: {
        get () {
          return Math.round(this.getCurrentValueObj.value / 10) * 10
        },
        set (value) {
          const command = {
            control: this.control._id,
            endPoint: 'shutter-position-set',
            value
          }
          this.sendCommand(command)

          this.setStyles()
        }
      },
      getColor () {
        if (this.getCurrentValueObj.value && this.getCurrentValueObj.value > 0) {
          return 'brown lighten-2'
        }
      },
      updatedAt () {
        if (this.getCurrentValueObj) {
          return this.getCurrentValueObj.timestamp
        }
      },
      isWindowOpen () {
        return this.control.values &&
          this.control.values['window-state-response'] &&
          this.control.values['window-state-response'].value &&
          this.control.values['window-state-response'].value === true
      }
    },

    data () {
      return {
        selectedElement: null,
        selectedLabel: null,
        options: Array.from(Array(11), (x, index) => {
          const value = index * 10
          return {
            text: value + ' %',
            value
          }
        }),
      }
    },

    methods: {
      ...mapActions({
        sendCommand: 'commands/sendCommandAction'
      }),
      setStyles () {
        const bgColorDimFactor = this.setValue / 200
        const elementStyle = '' +
          'background-color: rgba(107, 30, 0, ' + bgColorDimFactor + ');' +
          'padding-left: 10px;' +
          'border: 1px dotted rgba(107, 30, 0, ' + (this.setValue / 200 + 0.2) + ');'
        this.selectedElement.setAttribute('style', elementStyle)

        const color = bgColorDimFactor > 0.34 ? '#fff' : 'black'
        const labelStyle = '' +
          'color:' + color + ';'
        this.selectedLabel.setAttribute('style', labelStyle)
      }
    },

    mounted () {
      const styles = this.$el.querySelector('.v-select__slot > label').getAttribute('style') + 'top: 0px;'
      this.$el.querySelector('.v-select__slot > label').setAttribute('style', styles)

      this.selectedLabel = this.$el.querySelector('.v-select__selections > span')
      this.selectedElement = this.$el.querySelector('.v-select__slot')

      this.setStyles()
    },

    props: {
      control: {
        type: Object,
        required: true
      }
    },

    watch: {
      setValue () {
        this.setStyles()
      }
    }
  }
</script>
<style>
  .ertzui {
    color: #6b1e00;
  }
</style>
