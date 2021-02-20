<template>
  <div v-if="show" class="c-short-message">
    <slot />
    <button class="c-short-message__close" @click="show = false">
      <Icon name="x" :size="14" />
    </button>
  </div>
</template>
<script>
export default {
  name: 'ShortMessage',
  data() {
    return {
      show: true
    }
  }
}
</script>
<style src="./style.styl" lang="stylus" scoped />
