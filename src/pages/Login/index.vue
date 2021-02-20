<template>
  <div class="p-login">
    <form action="" class="p-login__form">
      <Field
        name="token"
        label="Insira o seu token do GitHub"
        sublabel="O token ficará gravado localmente, para que você não precise voltar no GitHub quando quiser usar a plataforma novamente. Sendo assim, lembre-se de sair, caso esteja em um computador que não confia."
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
};
</script>
<style src="./style.styl" lang="stylus" scoped />
