<template>
  <div
    :class="{ isActive: value }"
    :day="day"
    :hour="hour"
    :timeSlot="timeSlot"
    :data="value.toString()"
    :style="{ 'cursor': isInSelectionMode ? 'pointer': 'default' }"
  ></div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    beforeDestroy () {
      this.elem.removeEventListener('mousedown', this.onMouseDown, false)
      this.elem.removeEventListener('mouseover', this.onMouseOver, false)
      window.removeEventListener('mouseup', this.onMouseUp, false)
    },

    computed: {
      ...mapGetters({
        getTimeSlotValue: 'timeSlots/getTimeSlotValue',
        isInSelectionMode: 'timeSlots/isInSelectionMode',
        valueToUse: 'timeSlots/valueToUse',
      }),
      value () {
        return this.getTimeSlotValue(this.day, this.hour, this.timeSlot)
      }
    },

    data () {
      return {
        elem: null
      }
    },

    mounted () {
      this.elem = this.$el
      this.elem.addEventListener('mousedown', this.onMouseDown, true)
      this.elem.addEventListener('mouseover', this.onMouseOver, true)
      window.addEventListener('mouseup', this.onMouseUp, true)
    },

    methods: {
      ...mapMutations({
        setTimeSlotValue: 'timeSlots/setTimeSlotValueMutation',
        setValueToUse: 'timeSlots/setValueToUseMutation',
        start: 'timeSlots/startMutation',
        stop: 'timeSlots/stopMutation',
      }),
      onMouseDown () {
        const newValue = !this.value
        this.setValueToUse(newValue)
        this.start()
        this.setValue(newValue)
      },
      onMouseUp () {
        this.stop()
      },
      onMouseOver () {
        if (this.isInSelectionMode) {
          this.setValue(this.valueToUse)
        }
      },
      setValue (value) {
        const payload = {
          day: this.day,
          hour: this.hour,
          timeSlot: this.timeSlot,
          value
        }
        this.setTimeSlotValue(payload)
      },
    },

    props: {
      quarters: {
        type: Array,
        default: () => [0, 1, 2, 3]
      },
      day: {
        type: Number,
        required: true,
      },
      hour: {
        type: Number,
        required: true,
      },
      timeSlot: {
        type: Number,
        required: true,
      },
    }
  }
</script>

<style scoped>
  .quarters {
    display: block;
    width: calc(100% - 1px);
    height: 30px;
  }

  .quarters > .quarter {
    border: none;
    float: left;
    height: 30px;
    padding-bottom: 8px;
    width: 25%;
  }

  .quarters > .quarter > div {
    background-color: #eee;
    border-right: 1px solid #bbb;
    height: 100%;
  }

  .quarters > .quarter:last-child > div {
    border-right: none;
  }

  .quarters > .quarter > div.isActive {
    background-color: rgba(136, 39, 0, 0.7);
  }
</style>
