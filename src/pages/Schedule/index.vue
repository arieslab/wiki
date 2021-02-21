<template>
  <div class="p-schedule">
    <Dropdown
      v-if="codes"
      :items="codes"
      :initial="initial"
      @change="selectCode"
    />
    <Spacing vertical="4" class="p-schedule__table" v-html="table" />
  </div>
</template>
<script>
import Dropdown from "../../components/global/Dropdown/Dropdown.vue";
export default {
  components: { Dropdown },
  name: "Schedule",
  route: "/",
  alias: "/agenda",
  layout: "painel",
  middleware: ["auth"],
  data() {
    return {
      table: "",
    };
  },
  computed: {
    codes() {
      return this.$store.schedule?.codes?.map((i) => ({
        ...i,
        name: i.name.replace(".md", "").replace("Schedule-", "Agenda "),
      }));
    },
    initial() {
      return this.codes && this.codes[this.codes.length - 1];
    },
  },
  beforeMount() {
    this.$store.schedule.getCodes().then((codes) => {
      this.selectCode(codes[codes.length - 1]);
    });
  },
  methods: {
    selectCode(code) {
      if (code) {
        this.$store.schedule.getSchedule(code).then((result) => {
          function urltoFile(url, filename, mimeType) {
            return fetch(url)
              .then(function(res) {
                return res.arrayBuffer();
              })
              .then(function(buf) {
                return new File([buf], filename, { type: mimeType });
              });
          }

          return urltoFile(
            "data:text/html;base64," + result.content,
            "hello.txt",
            "text/html",
          ).then((file) => {
            return file.text().then((e) => {
              const text = e
                .replace(/(## [A-Z]+\s[\d])\w+/is, "")
                .replace(/(<tr>(\s|\t|\n)*<tr>)/g, "<tr>");
              console.log(text);
              this.table = text;
            });
          });
        });
      }
    },
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
