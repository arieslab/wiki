<template>
  <div class="p-schedule">
    <Spacing bottom="2" class="v--flex" style="gap: 8px">
      <Search class="v--flex-align-right" />
      <Button class="v--bg-aries-orange" to="/leituras/opcoes/nova">
        Adicionar Leitura
      </Button>
    </Spacing>
    <Card
      v-for="reading in $store.readings.readings"
      :key="reading.id"
      :item="reading"
    />
  </div>
</template>
<script>
import Card from "@/components/readings/Card/Card.vue";
import Search from "../../../components/readings/Search/Search.vue";
export default {
  components: { Card, Search },
  name: "Readings",
  route: "/leituras",
  layout: "painel",
  data() {
    return {
      table: "",
    };
  },
  computed: {},
  beforeMount() {
    this.$store.readings.getReadings();
  },
  methods: {},
};
</script>
<style src="./style.styl" lang="stylus" scoped />
