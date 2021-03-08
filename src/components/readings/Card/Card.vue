<template>
  <div class="c-reading-card">
    <Button
      v-if="
        $store.auth.user?.login &&
          item.assignee?.login &&
          $store.auth.user.login === item.assignee.login
      "
      style="float: right"
      :to="`/leituras/${item.number}/editar`"
    >
      <Icon name="edit" size="13" />
    </Button>
    <router-link :to="`/leituras/${item.number}`">
      <h2 class="c-reading-card__title">
        {{ item.title }}
      </h2>
    </router-link>
    <div class="c-reading-card__tags">
      <Tag
        v-for="label in labels"
        :key="label.id"
        :style="colorfy(label.name)"
        @click="$emit('click-tag', label.name)"
      >
        {{ label.name }}
      </Tag>
    </div>
    <Spacing vertical="1">
      <Line />
    </Spacing>
    <p v-html="getText(item.body)" />
    <Spacing vertical="1">
      <Line />
    </Spacing>
    <div v-if="item.assignee" class="c-reading-card__assignee">
      <img :src="item.assignee?.avatar_url" />
      <a :href="item.assignee?.html_url" target="_blank"
        >@{{ item.assignee?.login }}</a
      >
    </div>
  </div>
</template>
<script>
import color from "@/helpers/color";

export default {
  name: "ReadingCard",
  emits: ["click-tag"],
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    labels() {
      return this.item.labels.filter((i) => !i.name.startsWith("author:"));
    },
  },
  methods: {
    colorfy(str) {
      const bg = color.string2Hex(str);

      return {
        ["background-color"]: bg,
        color: color.colorContrast(bg, "#FFF", "#000"),
      };
    },
    getText(text) {
      return text
        .split("#summary")[0]
        .replace("#authors", "<h3>Autores</h3>")
        .replace(/\n/g, "");
    },
    detectUrl(text) {
      //   const match = text.match(
      //     /(^(http(s?)|):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))?/g,
      //   );
      //   console.log(match);
      //   match.forEach((i) => {
      //     text = text.replace(
      //       i,
      //       `<a href="${i}" target="_blank" rel="unfollow">${i}</a>`,
      //     );
      //   });
      return text;
    },
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
