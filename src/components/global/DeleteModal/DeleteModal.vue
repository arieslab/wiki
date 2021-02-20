<template>
  <Modal small @close="close">
    <p>Tem certeza que deseja excluir "{{ name }}"?</p>
    <p>Esta ação é irreversível.</p>
    <template v-slot:footer>
      <div class="v--flex v--flex-align-right">
        <Button @click="close">Cancelar</Button>
        <Spacing left="1">
          <Button
            class="v--bg-amaranth"
            @click="remove"
            :loading="loading"
            style="width: 176px"
          >
            Excluir
          </Button>
        </Spacing>
      </div>
    </template>
  </Modal>
</template>
<script>
export default {
  name: 'DeleteModal',
  emits: ['remove', 'close'],
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'isso'
    },
    id: {
      type: Number,
      default: 0
    }
  },
  methods: {
    remove() {
      this.$emit('remove', { id: this.id, name: this.name })
    },

    close() {
      this.$emit('close')
    }
  }
}
</script>
