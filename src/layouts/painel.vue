<template>
  <div class="l-painel">
    <header class="l-painel__header">
      <Navbar />
    </header>
    <div class="l-painel__content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Navbar from "../components/Navbar/Navbar";
export default {
  name: "Painel",
  components: {
    Navbar,
  },
};
</script>
<style lang="stylus" scoped>
.l-painel {
  &__header {
    height: 80px;
  }

  &__content {
    padding: 40px 5%;
    min-height: calc(100vh - 80px);
    padding-bottom: 80px;

    @media (max-width 768px) {
      padding 16px 5%;
      padding-bottom: 80px;
    }
  }
}
</style>
