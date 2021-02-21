<template>
  <div class="c-fake" :style="{ height, width }"></div>
</template>
<script>
export default {
  name: "Fake",
  props: {
    height: {
      type: String,
      default: "20px",
    },
    width: {
      type: String,
      default: "100%",
    },
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
