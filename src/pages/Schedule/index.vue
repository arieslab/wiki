<template>
  <div>
    <Dropdown :items="this.$store.schedule.codes" />
  </div>
</template>
<script>
import Dropdown from "../../components/global/Dropdown/Dropdown.vue";
export default {
  components: { Dropdown },
  name: "Schedule",
  route: "/agenda",
  layout: "painel",
  beforeMount() {
    this.$store.schedule.getCodes();
  },
};
</script>
