<template>
  <ReadingForm type="create" />
</template>
<script>
import ReadingForm from "../../../components/readings/Form/Form.vue";
export default {
  components: { ReadingForm },
  route: "/leituras/opcoes/nova",
  name: "CreateReading",
  layout: "painel",
  title: "Criar leitura - Aries Lab",
};
</script>
