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
        <div v-html="getText()" />
      </Spacing>
      <Spacing v-if="downloadables?.length" vertical="4">
        <p>Arquivos</p>
        <Spacing top="2" class="p-reading__downloadable">
          <a
            v-for="pdf in downloadables"
            :key="pdf.url"
            class="p-reading__downloadable-item"
            :href="pdf.url"
            target="_blank"
          >
            <Icon name="download-cloud" />
            <span>
              {{ pdf.name }}
            </span>
          </a>
        </Spacing>
      </Spacing>
      <p>Apresentado por:</p>
      <Spacing top="2" class="p-reading__assignee">
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
  data() {
    return {
      pdfs: [],
    };
  },
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
    downloadables() {
      return (
        this.pdfs
          ?.map((i) => {
            const arr = i.split("](");
            if (arr.length !== 2) {
              return null;
            }
            return {
              name: arr[0]
                .replace("[", "")
                .replace("Link do texto", "Texto para download"),
              url: arr[1].replace(")", ""),
            };
          })
          .filter((i) => i) || []
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
    getText() {
      let text =
        this.reading &&
        this.reading.body
          .replace(/\n/g, "<br/>")
          .replace("<br/><br/>", "<br/>")
          .replace("#authors", "<h2>Autores</h2>")
          .replace("#summary", "<h2>Resumo crítico</h2>");
      this.pdfs = text.match(
        /\[.*\]\(((http(s?)):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))?\)/g,
      );
      if (this.pdfs) {
        this.pdfs.forEach((i) => {
          text = text.replace(i, "");
        });
      }

      return text;
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
