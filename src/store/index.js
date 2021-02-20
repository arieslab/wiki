export class Store {
  ctx;

  constructor(ctx) {
    this.ctx = ctx;
    this.pages = require.context(".", true, /.*\.(js)$/);
    this.namespaces = this.pages.keys().map((page) => {
      const path = page.split("/");

      path.splice(0, 1);

      if (path.length && path.length > 1) {
        path.splice(path.length - 1, 1);
      }
      const name = path.join("/");

      if (name !== "index.js") {
        const plugin = this.pages(page).default;
        const proxy = new Proxy(new plugin(ctx), {
          get: (target, prop) => {
            return prop in target ? target[prop] : target.state[prop];
          },
        });

        this[name] = proxy;
      }
    });
  }
}

export default {
  install: (app) => {
    app.config.globalProperties.$store = new Store(app);
  },
};
