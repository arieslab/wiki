<template>
  <div class="c-field">
    <label v-if="label" :for="fieldId" class="c-field__label">
      {{ label }}
    </label>
    <fieldset class="c-field__fieldset">
      <textarea
        :id="fieldId"
        class="c-field__input"
        :class="{
          'c-field__input--large': large,
        }"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :autocapitalize="autocapitalize"
        :autocorrect="autocorrect"
        :rows="rows"
        :value="inputValue"
        @input="input"
      />
    </fieldset>
    <p v-if="sublabel">
      <small>{{ sublabel }}</small>
    </p>
  </div>
</template>
<script>
export default {
  name: "FieldText",
  emits: ["update:modelValue"],
  props: {
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    rows: {
      type: [Number, String],
      default: 2,
    },
    autocapitalize: {
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
    value: {
      type: [Number, String],
      default: "",
    },
    sublabel: {
      type: String,
      default: "",
    },
    disabled: {
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
      inputValue: this.value,
    };
  },
  computed: {
    fieldId() {
      return `field-${this.name}`;
    },
  },
  methods: {
    input(e) {
      this.inputValue = e.target.value;
      this.$emit("update:modelValue", this.inputValue);
    },
    changePasswordVisibility() {
      return (this.passwordIsVisible = !this.passwordIsVisible);
    },
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
