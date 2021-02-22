import { createRouter, createWebHashHistory } from "vue-router";
import { h } from "vue";
class Routerex {
  constructor() {
    this.pages = require.context("@/pages", true, /.*\.(vue)$/);
    this.layouts = require.context("@/layouts", true, /.*\.(vue)$/);
    this.middlewares = require.context("@/middlewares", true, /.*\.(js)$/);
  }

  parsePath(file) {
    return file
      .replace("/_", "/:")
      .replace("index.vue", "")
      .replace(".vue", "")
      .replace(".", "")
      .trim();
  }

  dotVue(layout) {
    return `./${layout}.vue`;
  }

  dotJs(file) {
    return `./${file}.js`;
  }

  runMiddleware(_context) {
    let mids = [];
    const { _component } = _context;
    if (typeof _component.middleware === "string") {
      mids.push(_component.middleware);
    } else {
      mids = _component.middleware;
    }

    mids.forEach(async (mid) => {
      const _middleware = this.middlewares(this.dotJs(mid)).default;
      await _middleware(_context);
    });
  }

  get router() {
    return this.pages.keys().map((page) => {
      const _component = this.pages(page).default;
      const _layout =
        _component.layout &&
        this.layouts(this.dotVue(_component.layout)).default;

      if (_component.name) {
        return {
          name: _component.name,
          path: _component.route ? _component.route : this.parsePath(page),
          alias: _component.alias || [],
          component: _layout ? h(_layout, {}, () => h(_component)) : _component,
          meta: _component.meta ? _component.meta : null,
          beforeEnter: (to, from, next) => {
            if (_component.title) {
              document.title = _component.title;
            }
            if (_component.middleware) {
              this.runMiddleware({
                _component,
                to,
                from,
                redirect: next,
                next,
              });
            } else {
              return next();
            }
          },
        };
      }
    });
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: new Routerex().router,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
