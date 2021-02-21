<template>
  <div class="c-line" :class="{ 'c-line--vertical': vertical }" />
</template>
<script>
export default {
  name: 'Line',
  props: {
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style src="./style.styl" lang="stylus" scoped />
