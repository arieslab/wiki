import { createApp } from "vue";
import App from "./App.vue";
import routerex from "@jprodrigues70/routerex";
import toaster from "@meforma/vue-toaster";
import wait from "@meforma/vue-wait-for";
import global from "./components/global";
import "./assets/css/main.styl";
import axios from "./plugins/axios.js";
import store from "./store";

const app = createApp(App);

global.keys().forEach((file) => {
  const component = global(file).default;
  if (component.name) {
    app.component(component.name, component);
  } else {
    throw "Global components requires name attribute";
  }
});

app
  .use(axios)
  .use(wait)
  .use(toaster)
  .use(store)
  .use(routerex)
  .mount("#app");
