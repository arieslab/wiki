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
      <Button
        class="v--bg-aries-orange"
        style="width: 150px"
        :loading="$wait.is('login')"
        >ENTRAR</Button
      >
      <Spacing vertical="2">
        <Line />
      </Spacing>
      <p>
        Para criar um token no GitHub, basta acessar
        <a href="https://github.com/settings/tokens" target="_blank"
          >https://github.com/settings/tokens</a
        >. Dê todas as permissões do tipo "repo", e a opção "read:user".
      </p>
    </form>
  </div>
</template>
<script>
export default {
  name: "Login",
  route: "/login",
  middleware: ["guest"],
  title: "Login - Aries Lab",
  data() {
    return {
      token: "",
    };
  },
  methods: {
    submit() {
      if (!this.token) {
        this.$toast.error("Você precisa adicionar um token!");
        return;
      }
      this.$wait.start("login");
      this.$store.auth
        .getUser({ token: this.token })
        .then(() => {
          this.$router.push("/agenda");
        })
        .catch(() => {
          this.$toast.error("Token inválido!");
          return;
        })
        .finally(() => {
          this.$wait.end("login");
        });
    },
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
