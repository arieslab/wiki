<template>
  <div class="p-reading-create">
    <div>
      <Button class="v--bg-white" to="/leituras">
        <Icon name="arrow-left" size="24" />
      </Button>
    </div>
    <div class="p-reading-create__body">
      <Spacing bottom="2">
        <h1>Criar leitura</h1>
        <p>
          Ao criar, você será a pessoa registrada como facilitadora da
          discussão.
        </p>
      </Spacing>
      <form @submit.prevent="submit">
        <Field
          :disabled="$wait.is('post/readings')"
          label="Título"
          name="title"
          v-model="title"
        />
        <Field
          :disabled="$wait.is('post/readings')"
          label="Autores"
          name="authors"
          v-model="authors"
        />
        <FieldText
          :disabled="$wait.is('post/readings')"
          label="Seu resumo crítico"
          name="summary"
          rows="12"
          v-model="summary"
        />
        <Field
          :disabled="$wait.is('post/readings')"
          label="Tags"
          sublabel="Separe por vírgula"
          name="labels"
          v-model="labels"
        />
        <Button
          class="v--bg-aries-orange"
          style="width:200px"
          :loading="$wait.is('post/readings')"
        >
          Criar leitura
        </Button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "CreateReading",
  route: "/leituras/opcoes/nova",
  layout: "painel",
  data() {
    return {
      title: "",
      authors: "",
      summary: "",
      labels: "",
    };
  },
  methods: {
    submit() {
      const body = `#authors\n${this.authors}\n#summary\n${this.summary}`;
      this.$store.readings
        .create({
          title: this.title,
          body,
          labels: this.labels.split(",").map((i) => i.trim()),
          assignee: this.$store.auth?.user?.login,
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
