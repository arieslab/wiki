<template>
  <div class="c-selection-bar">
    <div class="c-selection-bar__board">
      <Checkbox />
      <Button class="c-selection-bar__button" @click="showList = true">
        {{ items.length }} {{ what }}
      </Button>
      <div class="c-selection-bar__board-right v--flex">
        <Button
          class="c-selection-bar__button"
          v-for="option in options"
          :key="option.value"
          @click="$emit('click', { type: option.value, items })"
        >
          <Icon :name="option.icon" :size="14" />
          {{ option.name }}
        </Button>
        <Spacing left="1">
          <Button class="c-selection-bar__button" @click="clear">
            <Icon name="x" :size="14" />
          </Button>
        </Spacing>
      </div>
    </div>
    <Modal
      v-if="showList"
      title="Items selecionados"
      subtitle="Esta é a lista com todos os items que você escolheu"
      @close="showList = false"
      small
    >
      <slot v-if="$slots.selecteds" name="selecteds"> </slot>
      <div v-else class="c-selection-bar__checklist">
        <div
          v-for="item in items"
          :key="item.id"
          class="c-selection-bar__checklist-item"
        >
          <input
            :id="`c-selection-bar__checklist-item-${item.id}`"
            type="checkbox"
            checked
            @input="select($event, item)"
          />
          <label :for="`c-selection-bar__checklist-item-${item.id}`">
            {{ item.name }}
          </label>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'SelectionBar',
  emits: ['click', 'remove'],
  props: {
    options: {
      type: Array,
      default: () => [],
      validator: (value) => {
        if (value.length) {
          for (let i in value) {
            const keys = Object.keys(value[i])

            if (!(keys.includes('name') && keys.includes('value'))) {
              return false
            }
          }
        }
        return true
      }
    }
  },
  data() {
    return {
      items: [],
      showList: false
    }
  },
  computed: {
    what() {
      return this.items.length === 1 ? 'selecionado' : 'selecionados'
    }
  },
  methods: {
    add(item) {
      if (!item?.id) {
        throw 'Item needs to be a object with id prop'
      }
      this.remove(item)
      this.items.push(item)
    },
    remove(item) {
      this.items = this.items.filter((i) => i.id !== item.id)
    },
    clear() {
      this.$emit('clear', this.items)
      this.$nextTick(() => {
        this.items = []
      })
    },
    select(e, item) {
      if (e.target.checked) {
        this.add(item)
      } else {
        this.remove(item)
      }
    }
  }
}
</script>
<style lang="stylus" src="./style.styl" scoped></style>
