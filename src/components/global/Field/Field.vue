<template>
  <div class="c-field">
    <label v-if="label" :for="fieldId" class="c-field__label">
      {{ label }}
      <router-link v-if="forgotPath" :to="forgotPath">Esqueceu?</router-link>
    </label>
    <fieldset class="c-field__fieldset">
      <input
        ref="input"
        :id="fieldId"
        class="c-field__input"
        :class="{
          'c-field__input--switable': type === 'password',
          'c-field__input--large': large,
        }"
        :type="passwordIsVisible ? 'text' : type"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :autocapitalize="autocapitalize"
        :autocomplete="autocomplete"
        :autocorrect="autocorrect"
        :value="modelValue"
        :readonly="readonly"
        @input="input"
        @keydown.enter="enter"
      />
      <button
        v-if="type === 'password'"
        class="c-field__visibility-switch"
        :required="required"
        type="button"
        @click="changePasswordVisibility"
      >
        <icon :name="passwordIsVisible ? 'eye' : 'eye-off'" />
      </button>
      <button
        v-if="type === 'search'"
        class="c-field__search-despatcher"
        :required="required"
        @click="changePasswordVisibility"
      >
        <icon name="search" />
      </button>
    </fieldset>
    <p v-if="sublabel">
      <small>{{ sublabel }}</small>
    </p>
  </div>
</template>
<script>
export default {
  name: "Field",
  emits: ["update:modelValue", "enter"],
  props: {
    modelValue: String, // previously was `value: String`
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    autocapitalize: {
      type: String,
      default: "",
    },
    autocomplete: {
      type: String,
      default: "",
    },
    autocorrect: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    sublabel: {
      type: String,
      default: "",
    },
    forgotPath: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      passwordIsVisible: false,
    };
  },
  computed: {
    fieldId() {
      return `field-${this.name}`;
    },
  },
  methods: {
    enter(e) {
      this.$emit("enter", e);
    },
    input(e) {
      this.$emit("update:modelValue", e.target.value);
    },
    changePasswordVisibility() {
      return (this.passwordIsVisible = !this.passwordIsVisible);
    },
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
