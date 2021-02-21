import { reactive } from "vue";
import { $axios } from "@/plugins/axios";

/**
 * users are issues
 */
export default class Auth {
  constructor(ctx) {
    this.ctx = ctx;

    this.state = reactive({
      token: localStorage.token || null,
      user: localStorage.user ? JSON.parse(localStorage.user || {}) : {},
    });
  }

  setUser(user) {
    this.state.user = user;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }

  setToken(token) {
    localStorage.setItem("token", token);
    return (this.state.token = token);
  }

  getUser({ token }) {
    const axios = this.ctx ? this.ctx.$axios : $axios;
    return axios
      .get("/user", {
        headers: {
          Accept: "application/vnd.github.squirrel-girl-preview",
          Authorization: `token ${token}`,
        },
      })
      .then((result) => {
        if (result && result.data) {
          this.setToken(token);
          return this.setUser(result.data);
        }
      });
  }
}
export const auth = new Auth();
