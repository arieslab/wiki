<template>
  <ReadingForm
    v-if="!$wait.is('get/reading') && $store.readings.reading"
    type="patch"
    :item="{
      ...$store.readings.reading,
      labels: labels,
      summary: summary(),
      authors: authors,
      link: getLink,
    }"
  />
</template>
<script>
import ReadingForm from "../../../components/readings/Form/Form.vue";
export default {
  components: { ReadingForm },
  route: "/leituras/:number/editar",
  name: "EditReading",
  layout: "painel",
  title: "Editar leitura - Aries Lab",
  data() {
    return {
      pdfs: [],
      link: "",
      authors: "",
    };
  },
  beforeMount() {
    this.$store.readings.getReading(this.$route.params.number);
  },
  computed: {
    labels() {
      return (
        this.$store.readings.reading.labels.map((i) => i.name).join(", ") || ""
      );
    },
    getLink() {
      return this.link || "";
    },
  },
  methods: {
    summary() {
      const arr =
        this.$store.readings.reading &&
        this.$store.readings.reading.body.split("#summary");
      let text = arr[1] || arr[0];
      this.pdfs = text.match(
        /\[.*\]\(((http(s?)):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))?\)/g,
      );
      this.authors = arr[0].replace(/\n/g, "").replace("#authors", "");
      if (this.pdfs) {
        this.pdfs.forEach((i) => {
          text = text.replace(i, "");
        });
        this.link = this.pdfs[0].split("](")[1].replace(")", "");
      }

      return text.trim("\n");
    },
  },
};
</script>
