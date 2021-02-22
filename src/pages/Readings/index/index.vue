<template>
  <div class="p-readings">
    <Spacing bottom="2" class="v--flex">
      <div class="v--flex v--flex-align-right" style="gap: 8px">
        <Field
          style="width: 250px"
          type="search"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          name="q"
          placeholder="Pesquise por título ou texto"
          v-model="q"
          sublabel="Mínimo de 3 caracteres"
          @input="search"
        />
        <Button class="v--bg-aries-orange" to="/leituras/opcoes/nova">
          <Icon name="plus" />
          <span class="v--hide-xs">
            Adicionar Leitura
          </span>
        </Button>
      </div>
    </Spacing>
    <div class="p-readings__body">
      <div>
        <h2>Filtrar</h2>
        <Spacing top="2" class="p-readings__filter">
          <div
            v-for="label in $store.labels.labels"
            :key="label.name"
            class="p-readings__filter-item"
          >
            <input
              type="checkbox"
              :id="label.name"
              :checked="labels.includes(label.name)"
              @change="filter({ type: 'label', label }, $event)"
            />
            <label :for="label.name">
              {{ label.name }}
            </label>
          </div>
        </Spacing>
      </div>
      <div class="p-readings__cards">
        <template v-if="$wait.is('get/readings')">
          <CardLoading v-for="i in 3" :key="`fake-card-${i}`" />
        </template>
        <template v-else-if="$store.readings?.readings?.length">
          <Card
            v-for="reading in $store.readings.readings"
            :key="reading.id"
            :item="reading"
          />
        </template>
        <template v-else>
          <h2>Ooops!</h2>
          <p>
            Não há resultados relacionados à sua busca
          </p>
        </template>
      </div>
    </div>
    <Paginator @click="page" />
  </div>
</template>
<script>
import Card from "@/components/readings/Card/Card.vue";
import CardLoading from "@/components/readings/Card/Loading.vue";
export default {
  components: { Card, CardLoading },
  name: "Readings",
  route: "/leituras",
  layout: "painel",
  data() {
    return {
      table: "",
      labels: [],
      q: "",
    };
  },
  computed: {},
  beforeMount() {
    this.labels = this.$route.query.labels
      ? this.$route.query.labels.split(",")
      : [];
    this.q = this.$route.query.q;
    const query = {
      q: this.q,
      labels: this.labels.join(","),
      page: this.$route.query.page,
    };
    if (this.q) {
      this.$store.readings.searchReadings({ ...query, labels: this.labels });
    } else {
      this.$store.readings.getReadings(query);
    }
    this.$store.labels.getLabels();
  },
  mounted() {},
  methods: {
    page(page) {
      this.$router
        .replace({
          ...this.$route,
          query: { ...this.$route.query, page },
        })
        .then(() => {
          this.search();
        });
    },
    filter(filter, $event) {
      if ($event?.target?.checked) {
        this.labels.push(filter.label.name);
      } else {
        this.labels = this.labels.filter((i) => i !== filter.label.name);
      }

      this.$router.replace({
        ...this.$route,
        query: { ...this.$route.query, labels: this.labels.join(",") },
      });

      if (this.q && this.q.length >= 3) {
        this.search();
      } else {
        this.$store.readings.getReadings({
          labels: this.labels.join(",") || null,
          page: this.$route.query.page,
        });
      }
    },
    search() {
      if (!this.q) {
        this.$router.replace({
          ...this.$route,
          query: { ...this.$route.query, q: null },
        });
        this.$store.readings.getReadings({
          labels: this.labels.join(",") || null,
          page: this.$route.query.page,
        });
        return;
      }

      if (this.q.length >= 3 || !this.q) {
        this.$router.replace({
          ...this.$route,
          query: { ...this.$route.query, q: this.q },
        });
        this.$store.readings.searchReadings({
          q: this.q,
          labels: this.labels,
          page: this.$route.query.page,
        });
      }
    },
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
