<template>
  <div class="p-readings">
    <Spacing bottom="2" class="v--flex" style="gap: 8px">
      <Search class="v--flex-align-right" />
      <Button class="v--bg-aries-orange" to="/leituras/opcoes/nova">
        Adicionar Leitura
      </Button>
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
  </div>
</template>
<script>
import Card from "@/components/readings/Card/Card.vue";
import CardLoading from "@/components/readings/Card/Loading.vue";
import Search from "@/components/readings/Search/Search.vue";
export default {
  components: { Card, CardLoading, Search },
  name: "Readings",
  route: "/leituras",
  layout: "painel",
  data() {
    return {
      table: "",
      labels: [],
    };
  },
  computed: {},
  beforeMount() {
    this.labels = this.$route.query.labels
      ? this.$route.query.labels.split(",")
      : [];
    this.$store.readings.getReadings({ labels: this.labels.join(",") });
    this.$store.labels.getLabels();
  },
  mounted() {},
  methods: {
    filter(filter, $event) {
      if ($event.target.checked) {
        this.labels.push(filter.label.name);
      } else {
        this.labels = this.labels.filter((i) => i !== filter.label.name);
      }
      this.$router.replace({
        ...this.$route,
        query: { ...this.$route.query, labels: this.labels.join(",") },
      });
      this.$store.readings.getReadings({ labels: this.labels.join(",") });
    },
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
