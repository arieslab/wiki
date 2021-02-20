<template>
  <div class="c-field">
    <fieldset class="c-field__fieldset">
      <label v-if="label" :for="fieldId" class="c-field__label">
        {{ label }}
      </label>
      <select
        :name="name"
        :id="fieldId"
        class="c-field__input"
        :class="{ 'v--dark': $store.settings.darkMode }"
        :required="required"
        @change="$emit('change', $event)"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :selected="option.value === selected"
        >
          {{ option.name }}
        </option>
      </select>
      <div class="c-field__background">
        <button type="button" class="c-field__icon">
          <icon name="chevron-down" />
        </button>
      </div>
    </fieldset>
    <p v-if="sublabel">
      <small>{{ sublabel }}</small>
    </p>
  </div>
</template>
<script>
export default {
  name: 'FieldSelect',
  emits: ['change'],
  props: {
    selected: {
      type: null,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    sublabel: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      passwordIsVisible: false
    }
  },
  computed: {
    fieldId() {
      return `field-select-${this.name}`
    }
  },
  methods: {
    input(e) {
      this.$emit('update:modelValue', e.target.value)
    },
    changePasswordVisibility() {
      return (this.passwordIsVisible = !this.passwordIsVisible)
    }
  }
}
</script>
<style src="./style.styl" lang="stylus" scoped />
