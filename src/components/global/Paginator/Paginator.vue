<template>
  <div class="c-paginator">
    <div class="c-paginator__buttons">
      <Button @click="$emit('click', currentPage - 1)" v-if="currentPage > 1"
        >Anterior</Button
      >
      <Button
        @click="$emit('click', page)"
        v-for="page in buttons"
        :key="page"
        :active="page === currentPage"
        :class="{
          primary: page === currentPage,
        }"
      >
        {{ page }}
      </Button>
      <Button
        v-if="currentPage < $store.readings.lastPage"
        @click="$emit('click', currentPage + 1)"
      >
        Mais
      </Button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Paginator",
  emits: ["click"],
  computed: {
    currentPage() {
      return parseInt(this.$route?.query?.page) || 1;
    },
    buttons() {
      const currentPage = parseInt(this.$route.query.page);

      if (this.$store.readings.lastPage) {
        if (currentPage >= 4) {
          const list = [];
          for (
            let i = currentPage - 1;
            i <= Math.min(currentPage + 3, this.$store.readings.lastPage);
            i++
          ) {
            if (i > 0) {
              list.push(i);
            }
          }

          console.log(list);

          if (list.length && list.length < 5) {
            const n = 5 - list.length;
            for (let i = 1; i <= n; i++) {
              if (list[0] - i > 0) {
                list.unshift(list[0] - i);
              }
            }
          }

          if (list.length < 5 && list[0] === 2) {
            list.unshift(1);
          }
          return list;
        }

        return Math.min(this.$store.readings.lastPage, 5);
      }
      return [];
    },
  },
};
</script>
<style lang="stylus" src="./style.styl" scoped></style>
