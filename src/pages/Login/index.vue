<template>
  <div class="p-login">
    <form @submit.prevent="submit" class="p-login__form">
      <Spacing bottom="4" class="p-login__logo">
        <Icon name="aries" size="80" />
      </Spacing>
      <Field
        name="token"
        label="Insira o seu token do GitHub"
        sublabel="O token ficará gravado localmente, para que você não precise voltar no GitHub quando quiser usar a plataforma novamente. Sendo assim, lembre-se de sair, caso esteja em um computador que não confia."
        v-model="token"
      />
      <Button class="v--bg-aries-orange">ENTRAR</Button>
    </form>
  </div>
</template>
<script>
export default {
  name: "Login",
  route: "/login",
  middleware: ["guest"],
  data() {
    return {
      token: "",
    };
  },
  methods: {
    submit() {
      this.$store.auth
        .getUser({ token: this.token })
        .then(() => {
          // console.log("deu certo?");
          this.$router.push("/agenda");
        })
        .catch(() => {
          this.$toast.error("Token inválido!");
          return;
        });
    },
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
