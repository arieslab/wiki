<template>
  <div class="c-progress-bar">
    <div class="c-progress-bar__progress" :style="progress" />
  </div>
</template>
<script>
export default {
  name: 'ProgressBar',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: null,
      default: undefined
    },
    total: {
      type: [Number, String],
      default: 0
    },
    percentage: {
      type: null,
      default: undefined
    }
  },
  computed: {
    progress() {
      let width = 0
      if (this.percentage === undefined) {
        if (this.value !== undefined && this.total !== undefined) {
          width = this.calcPercentage(this.value, this.total)
        } else if (this.label.match(/[0-9]+(,)+[0-9]*( %)/)) {
          width = this.label.replace(',', '.').replace(' %', '')
        }
      } else {
        width = this.percentage
      }

      return {
        width: `${width}%`
      }
    }
  },
  methods: {
    calcPercentage(value, max) {
      if (max == 0) return 0
      let result = (value * 100) / max

      return result >= 100 ? 100 : result
    }
  }
}
</script>
<style lang="stylus" src="./style.styl" scoped></style>
