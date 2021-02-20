import axios from "axios";
import router from "@jprodrigues70/routerex";

const BASEURL = "https://api.github.com/";

let source = null;
let lastCalledUrl = "";
export class Axios {
  constructor(ctx = null) {
    this.ctx = ctx;
    this.$axios = axios.create({
      baseURL: BASEURL,
      "content-type": "application/json",
    });

    this.$axios.interceptors.request.use((config) => {
      let TOKEN = "";

      if (this.ctx?.config.globalProperties?.$store?.auth?.state.token) {
        TOKEN = this.ctx.config.globalProperties.$store.auth.state.token;
      } else {
        TOKEN = localStorage.getItem("token") || "";
      }

      config.headers.Authorization = TOKEN ? `Bearer ${TOKEN}` : "";

      const url = config.url.split("?")[0];

      if (lastCalledUrl === url && source) {
        source.cancel("canceled");
      }

      lastCalledUrl = url;
      source = axios.CancelToken.source();
      config.cancelToken = source.token;
      return config;
    });

    this.$axios.interceptors.response.use((response) => {
      history[response.config.url] = null;
      return response;
    }, this.onRequestError);
    return this.$axios;
  }

  onRequestError(e) {
    if (axios.isCancel(e)) {
      return;
    }

    if (e.config && e.response && e.response.status === 401) {
      const TOKEN = localStorage.getItem("token") || "";
      e.config.headers.Authorization = TOKEN ? `Bearer ${TOKEN}` : "";
      const retry = axios.create(e.config);

      retry.interceptors.response.use(
        (response) => {
          return response;
        },
        () => {
          localStorage.clear();
          router.push("/login");
        },
      );
      return retry.request(e.config);
    }

    return Promise.reject(e);
  }
}

export const $axios = new Axios();

export default {
  install: (app) => {
    app.config.globalProperties.$axios = new Axios(app);
    app.$axios = app.config.globalProperties.$axios;
  },
};
