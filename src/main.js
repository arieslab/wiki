import { createApp } from "vue";
import App from "./App.vue";
import routerex from "@jprodrigues70/routerex";
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
  .use(store)
  .use(routerex)
  .mount("#app");
