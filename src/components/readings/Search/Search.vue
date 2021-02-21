<template>
  <div class="c-discipline-search">
    <Button class="v--info v--rounded" @click="showModal">
      <icon name="search" />
      <Spacing left="1" hide-xs>Procurar leitura</Spacing>
    </Button>
    <Modal
      class="c-discipline-search__modal"
      v-if="modal"
      medium
      title="Encontrar leitura"
      top
      @close="hideModal"
    >
      <form>
        <Field
          type="search"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          name="q"
          large
          placeholder="Pesquise por título ou texto"
          v-model="q"
          :sublabel="q.length < 5 ? 'Mínimo de 5 caracteres' : ''"
          @input="search"
        />
      </form>
      <Spacing v-if="items.length" vertical="1">
        <p><b>Resultados encontrados</b> ({{ items.length }})</p>
      </Spacing>
      <div class="c-discipline-search__modal-body">
        <Spacing v-if="notFound" top="3">
          Não encontramos resultados para sua busca <b>"{{ q }}"</b>
        </Spacing>
        <template v-if="items && items.length">
          <Discipline
            v-for="item in items"
            :key="item.id"
            :item="item"
            @click="$emit('click-discipline', $event)"
          />
        </template>
        <Spacing v-if="searching" top="3">
          <div class="c-discipline-search__item">
            <div class="c-discipline-search__item-title" />
            <div class="c-discipline-search__item-subtitle" />
            <div class="c-discipline-search__item-hashtag" />
          </div>
        </Spacing>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "Search",
  emits: ["click-discipline"],
  data() {
    return {
      modal: false,
      q: "",
      items: [],
      timeout: null,
      notFound: false,
      searching: false,
    };
  },
  methods: {
    showModal() {
      this.modal = true;
    },
    hideModal() {
      this.notFound = false;
      this.items = [];

      this.modal = false;
    },
    search() {
      this.notFound = false;
      if (!this.q) {
        this.items = [];
        return;
      }
      // if (this.q.trim().length >= 5) {
      //   this.items = [];
      //   this.searching = true;
      //   if (this.timeout) {
      //     clearTimeout(this.timeout);
      //     this.timeout = null;
      //   }

      //   this.timeout = setTimeout(() => {
      //     this.$store.discipline
      //       .search({ q: this.q })
      //       .then((items) => {
      //         this.items = items;
      //       })
      //       .catch((e) => {
      //         if (e.message && e.message === "canceled") {
      //           return;
      //         }
      //         if (e.response.status === 404) {
      //           this.notFound = true;
      //         } else {
      //           let message = "Houve um erro, por favor recarregue a página";

      //           if (e.response && e.response.data && e.response.data.message) {
      //             message = e.response.data.message;
      //           }

      //           this.$toast.error(message);
      //         }
      //       })
      //       .finally(() => (this.searching = false));
      //   }, 300);
      // }
    },
  },
};
</script>
<style lang="stylus" src="./style.styl" scoped></style>
