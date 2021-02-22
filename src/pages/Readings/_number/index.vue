<template>
  <div class="p-reading">
    <Button class="v--bg-white" to="/leituras">
      <Icon name="arrow-left" size="24" />
    </Button>
    <div v-if="$wait.is('get/reading')" class="p-reading__text">
      <Fake height="1.5em" width="80%" />
      <Spacing vertical="4">
        <Fake height="1.2em" width="120px" />
        <br />
        <Fake />
        <Fake width="60%" />
        <br />
        <Fake height="1.2em" width="120px" />
        <br />
        <Fake />
        <Fake />
        <Fake />
        <Fake />
        <Fake />
        <Fake />
        <Fake width="60%" />
        <br />
        <Fake />
        <Fake />
        <Fake />
        <Fake />
        <Fake />
        <Fake />
        <Fake width="60%" />
      </Spacing>
    </div>
    <article v-else-if="reading" class="p-reading__text">
      <h1>
        {{ reading.title }}
      </h1>
      <Spacing vertical="4">
        <div v-html="text" />
      </Spacing>
      <Spacing class="p-reading__assignee">
        <img
          class="p-reading__assignee-avatar"
          :src="reading.assignee?.avatar_url"
        />
        <div>
          <a :href="reading.assignee?.url">@{{ reading.assignee?.login }}</a>
        </div>
      </Spacing>
    </article>
    <Spacing vertical="4">
      <Line />
    </Spacing>
    <section v-if="$wait.is('get/relations')" class="p-reading__relations">
      <Fake width="200px" />
      <div class="p-reading__relations-list">
        <CardLoading />
      </div>
    </section>
    <section
      v-else-if="$store?.readings?.relations"
      class="p-reading__relations"
    >
      <h2 class="p-reading__section-title">Leituras relacionadas</h2>
      <div class="p-reading__relations-list">
        <Card
          v-for="reading in $store.readings.relations"
          :key="reading.id"
          :item="reading"
          @click-tag="labelSearch"
        />
      </div>
    </section>
  </div>
</template>
<script>
import Card from "@/components/readings/Card/Card.vue";
import CardLoading from "@/components/readings/Card/Loading.vue";
export default {
  components: { Card, CardLoading },
  name: "TextPage",
  route: "/leituras/:number",
  layout: "painel",
  beforeMount() {
    this.$store.readings
      .getReading(this.$route.params.number)
      .then((result) => {
        const labels = result?.labels.map((i) => i.name);

        function getReadings(i, $store) {
          const list = labels[i];
          if (i < labels.length) {
            return $store.readings
              .getRelations({ labels: list })
              .then((items) => {
                const readings = items.filter((j) => j.id !== result.id);
                if (readings.length > 0) {
                  $store.readings.setRelations(readings);
                  i = null;
                } else {
                  return getReadings(i + 1, $store);
                }
              })
              .catch(() => {
                i = null;
              });
          }
          return Promise.resolve();
        }

        getReadings(0, this.$store);
      });
  },
  computed: {
    reading() {
      return this.$store.readings.reading;
    },
    text() {
      return (
        this.reading &&
        this.reading.body
          .replace(/\n/g, "<br/>")
          .replace("<br/><br/>", "<br/>")
          .replace("#authors", "<h2>Authors</h2>")
          .replace("#summary", "<h2>Summary</h2>")
      );
    },
  },
  methods: {
    labelSearch(label) {
      this.$router.push({
        path: "/leituras",
        query: {
          labels: label,
        },
      });
    },
  },
  unmounted() {
    this.$store.readings.setReading(null);
    this.$store.readings.setRelations(null);
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
<style lang="stylus">
br
  line-height 0.5
  display block
  margin 16px 0
  content " "
h2
  font-size 1.4em
h1,h2
  font-weight 600
</style>
