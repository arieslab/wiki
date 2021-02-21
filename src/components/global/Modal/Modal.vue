<template>
  <teleport to="body">
    <div class="c-modal" :class="classes">
      <div class="c-modal__overlay" @click="$emit('close')" />
      <div class="c-modal__window">
        <div class="c-modal__window-header">
          <Button circle class="c-modal__window-close" @click="$emit('close')">
            <Icon name="x" size="16" />
          </Button>
          <slot name="header">
            <div>
              <h1 v-if="title" class="c-modal__window-title">
                {{ title || "" }}
              </h1>
              <p v-if="subtitle" class="c-modal__window-subtitle">
                {{ subtitle || "" }}
              </p>
            </div>
            <div class="v--flex-align-right">
              <slot name="right-header" />
            </div>
          </slot>
        </div>
        <div v-if="$slots.default" class="c-modal__window-body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="c-modal__window-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </teleport>
</template>
<script>
import Button from "../Button/Button.vue";
export default {
  components: { Button },
  name: "Modal",
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    small: {
      type: Boolean,
      default: false,
    },
    medium: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Boolean,
      default: false,
    },
    ignoreHeaderPadding: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  data() {
    return {
      body: null,
      before: null,
    };
  },
  computed: {
    classes() {
      return {
        "c-modal--small": this.small,
        "c-modal--medium": this.medium,
        "c-modal--top": this.top,
        "c-modal--ignore-header-padding": this.ignoreHeaderPadding,
      };
    },
  },
  mounted() {
    this.body = document.getElementsByTagName("body")[0];
    this.before = this.body.style.overflow;
    this.body.style.overflow = "hidden";
    document.addEventListener("keydown", this.keyHandler);
  },
  unmounted() {
    this.body.style.overflow = this.before;
    document.removeEventListener("keydown", this.keyHandler);
  },
  methods: {
    keyHandler({ key }) {
      if (key === "Escape") {
        document.removeEventListener("keydown", this.keyHandler);
        this.$emit("close");
      }
    },
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
