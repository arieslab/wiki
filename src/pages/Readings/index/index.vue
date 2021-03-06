<template>
  <div class="p-readings">
    <Spacing bottom="2" class="v--flex">
      <div class="v--flex v--flex-align-right" style="gap: 2px">
        <Field
          style="width: 225px"
          type="search"
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
        <Spacing vertical="2" class="p-readings__filter">
          <div
            v-for="label in $store.labels.labels"
            :key="label.name"
            class="p-readings__filter-item"
          >
            <input
              type="checkbox"
              :id="label.name"
              :checked="labels.includes(label.name)"
              @change="filter({ type: 'labels', label }, $event)"
            />
            <label :for="label.name">
              {{ label.name }}
            </label>
          </div>
        </Spacing>
        <h2>Primeiro autor</h2>
        <Spacing vertical="2" class="p-readings__filter">
          <div
            v-for="label in $store.labels.authors"
            :key="label.name"
            class="p-readings__filter-item"
          >
            <input
              type="checkbox"
              :id="label.name"
              :checked="authors.includes(label.name)"
              @change="filter({ type: 'authors', label }, $event)"
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
            @click-tag="label"
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
  title: "Leituras - Aries Lab",
  layout: "painel",
  data() {
    return {
      table: "",
      labels: [],
      authors: [],
      q: "",
    };
  },
  computed: {},
  beforeMount() {
    this.labels = this.$route.query.labels
      ? this.$route.query.labels.split(",")
      : [];
    this.authors = this.$route.query.authors
      ? this.$route.query.authors.split(",")
      : [];
    this.q = this.$route.query.q;
    const query = {
      q: this.q,
      labels: this.labels.join(","),
      page: this.$route.query.page,
      assignee: this.$route?.query?.assignee || null,
      authors: this.$route?.query?.authors || null,
    };
    if (this.q) {
      this.$store.readings.searchReadings({
        ...query,
        labels: this.labels,
        authors: this.authors,
      });
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
    label(label) {
      this.labels = [label];

      this.$router
        .replace({
          ...this.$route,
          query: { ...this.$route.query, labels: [label].join(",") },
        })
        .then(() => {
          this.search();
        });
    },
    filter(filter, $event) {
      const { type } = filter;
      const reverse = type === "labels" ? "authors" : "labels";

      if ($event?.target?.checked) {
        if (type === "labels") {
          this[type].push(filter.label.name);
        } else {
          this[type] = [filter.label.name];
        }
      } else {
        this[type] = this[type].filter((i) => i !== filter.label.name);
      }

      this.$router.replace({
        ...this.$route,
        query: { ...this.$route.query, [type]: this[type].join(",") },
      });

      if (this.q && this.q.length >= 3) {
        this.search();
      } else {
        this.$store.readings.getReadings({
          [reverse]: this[reverse].join(",") || null,
          [type]: this[type].join(",") || null,
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
          authors: this.authors.join(",") || null,
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
          authors: this.authors,
          page: this.$route.query.page,
        });
      }
    },
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
