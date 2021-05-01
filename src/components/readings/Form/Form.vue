<template>
  <div class="p-reading-create">
    <div>
      <Button class="v--bg-white" to="/leituras">
        <Icon name="arrow-left" size="24" />
      </Button>
    </div>
    <div class="p-reading-create__body">
      <Spacing v-if="type === 'create'" bottom="2">
        <h1>Criar leitura</h1>
        <p>
          Ao criar, você será a pessoa registrada como facilitadora da
          discussão.
        </p>
      </Spacing>
      <Spacing v-else bottom="2">
        <h1>Editar leitura</h1>
        <p>
          Ao editar, você será a pessoa registrada como facilitadora da
          discussão.
        </p>
      </Spacing>
      <form @submit.prevent="submit">
        <Field
          :disabled="$wait.is('post/readings')"
          label="Título"
          name="title"
          required
          v-model="title"
        />
        <Field
          :disabled="$wait.is('post/readings')"
          label="Autores"
          name="authors"
          sublabel="Separe por vírgula"
          required
          v-model="authors"
        />
        <FieldText
          :disabled="$wait.is('post/readings')"
          label="Seu resumo crítico"
          name="summary"
          rows="12"
          required
          v-model="summary"
        />

        <Field
          :disabled="$wait.is('post/readings')"
          label="Tags"
          sublabel="Separe por vírgula"
          name="labels"
          required
          v-model="labels"
        />
        <Field
          :disabled="$wait.is('post/readings')"
          label="Link do texto"
          name="link"
          v-model="link"
        />
        <Spacing top="3">
          <Button
            class="v--bg-aries-orange"
            style="width:200px"
            :loading="$wait.is('post/readings')"
          >
            {{ type === "create" ? "Criar" : "Editar" }} leitura
          </Button>
        </Spacing>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "ReadingForn",
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: "create",
    },
  },
  data() {
    return {
      title: this.item.title || "",
      authors: this.item.authors || "",
      summary: this.item.summary || "",
      labels:
        this.item?.labels
          ?.split(",")
          .filter((i) => !i.trim().startsWith("author:"))
          .join(",") || "",
      link: this.item.link || "",
    };
  },
  methods: {
    submit() {
      const body =
        `#authors\n${this.authors}\n#summary\n${this.summary}` +
        (this.link ? `\n[Link do texto](${this.link})` : "");
      const authors = this.authors.split(",");
      const firstAuthor = authors?.length ? "author:" + authors[0] : "";

      this.$store.readings[this.type]({
        title: this.title,
        body,
        labels: this.labels
          .split(",")
          .map((i) => i.trim())
          .concat(firstAuthor.trim()),
        assignee: this.$store.auth?.user?.login,
        number: this.$route?.params?.number,
      })
        .then(() => {
          this.$toast.success("Leitura criada!");
          this.$router.push("/leituras");
        })
        .catch(() => {
          this.$toast.error("Houve um erro! Recarregue a página.");
        });
    },
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
