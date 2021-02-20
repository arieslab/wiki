<template>
  <button
    v-if="!to"
    class="c-button"
    :class="styles"
    :disabled="loading || disabled"
  >
    <div class="c-button__hover" />
    <div class="c-button__content">
      <PulseLine v-if="loading" />
      <slot v-else />
    </div>
  </button>
  <router-link
    v-else
    class="c-button"
    :class="styles"
    :disabled="loading || disabled"
    :to="to"
  >
    <div class="c-button__hover" />
    <div class="c-button__content">
      <PulseLine v-if="loading" />
      <slot v-else />
    </div>
  </router-link>
</template>
<script>
export default {
  name: "Button",
  props: {
    sprawled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    box: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    fit: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: "",
    },
  },
  computed: {
    styles() {
      return {
        [this.getClass("sprawled")]: this.sprawled,
        [this.getClass("box")]: this.box,
        [this.getClass("circle")]: this.circle,
        [this.getClass("fit")]: this.fit,
        [this.getClass("disabled")]: this.disabled,
      };
    },
  },
  methods: {
    getClass(name) {
      return `c-button--${name}`;
    },
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
