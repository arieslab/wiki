<template>
  <div class="c-dropdown" ref="dropdown">
    <!-- v-tooltip="tooltip" -->
    <Button
      class="c-dropdown__button"
      ref="button"
      :disabled="disabled"
      @click="show"
    >
      <slot />
      <template v-if="changeNameOnSelect">
        <Spacing v-if="$slots.default" :right="1 / 2">:</Spacing>
        {{ selected && selected.name ? selected.name : initial.name }}
      </template>
      <Spacing v-if="!hideIndicator" left="1">
        <Icon name="chevron-down" />
      </Spacing>
    </Button>
    <div v-show="showing" ref="content" class="c-dropdown__content">
      <div v-if="title" class="c-dropdown__title">{{ title }}</div>
      <ul v-if="items.length" class="c-dropdown__list">
        <li
          v-for="item in items"
          :key="item.name"
          class="c-dropdown__list-item"
          @click="click(item)"
        >
          <component
            :is="element(item)"
            :to="item && item.to"
            class="c-dropdown__list-item-container"
          >
            <div class="c-dropdown__list-item-content">
              <Icon v-if="item.icon" :name="item.icon" size="14" />

              <Spacing :left="item.icon ? 1 : 0">
                <span>
                  {{ item.name }}
                </span>
              </Spacing>
            </div>
            <div
              v-if="item.description"
              class="c-dropdown__list-item-description"
            >
              <small>{{ item.description }}</small>
            </div>
          </component>
        </li>
      </ul>
      <ul class="c-dropdown__list c-dropdown__list-slot">
        <slot name="content" />
      </ul>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";
export default {
  name: "Dropdown",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    initial: {
      type: Object,
      default: () => ({}),
    },
    hideIndicator: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: "bottom-start",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    changeNameOnSelect: {
      type: Boolean,
      default: true,
    },
    tooltip: {
      type: String,
      default: "",
    },
  },
  emits: ["change"],
  data() {
    return {
      selected: this.initial,
      showing: true,
      popper: null,
    };
  },
  computed: {
    styles() {
      return {};
    },
  },
  beforeMounted() {},
  mounted() {
    this.showing = false;
    const popcorn = this.$refs.button.$el;
    const tooltip = this.$refs.content;

    this.popper = createPopper(popcorn, tooltip, {
      placement: this.placement,
      positionFixed: true,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    });
  },
  methods: {
    element(item) {
      return item && item.to ? "router-link" : "div";
    },
    show() {
      this.showing = !this.showing;
      this.listenDocument();
      this.popper.update();
    },
    hide() {
      if (this.showing) {
        this.showing = false;
        this.stopListenDocument();
      }
    },
    listenDocument() {
      window.addEventListener("click", this.clickOutside);
    },
    stopListenDocument() {
      window.removeEventListener("click", this.clickOutside);
    },
    clickOutside(e) {
      this.$refs.dropdown &&
        !this.$refs.dropdown.contains(e.target) &&
        this.hide();
    },
    click(item) {
      this.selected = item;
      this.$emit("change", item);
      this.hide();
    },
  },
};
</script>

<style lang="stylus" src="./style.styl"></style>
