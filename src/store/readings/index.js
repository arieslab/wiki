import { reactive } from "vue";
/**
 * Readings are issues
 */
export default class Readings {
  constructor(ctx) {
    this.ctx = ctx;

    this.state = reactive({
      readings: null,
      reading: null,
      relations: null,
    });
  }

  setReadings(readings) {
    this.state.readings = readings;
    return readings;
  }

  setRelations(relations) {
    this.state.relations = relations;
    return relations;
  }

  setReading(reading) {
    this.state.reading = reading;
    return reading;
  }

  getReadings(params) {
    this.ctx.config.globalProperties.$wait.start("get/readings");

    return this.ctx.$axios
      .get("/repos/arieslab/study-database/issues", {
        headers: {
          Accept: "application/vnd.github.squirrel-girl-preview",
        },
        params: {
          per_page: 10,
          ...params,
        },
      })
      .then((result) => {
        if (result && result.data) {
          return this.setReadings(result.data);
        }
      })
      .finally(() => {
        this.ctx.config.globalProperties.$wait.end("get/readings");
      });
  }

  searchReadings({ q, labels }) {
    this.ctx.config.globalProperties.$wait.start("get/readings");
    const lbls = labels.map((i) => `label:"${i}"`).join(" ");
    const query = `${q} repo:arieslab/study-database is:issue in:title,body ${lbls}`;
    return this.ctx.$axios
      .get("/search/issues", {
        headers: {
          Accept: "application/vnd.github.squirrel-girl-preview",
        },
        params: {
          per_page: 10,
          q: query,
        },
      })
      .then((result) => {
        if (result && result.data) {
          return this.setReadings(result.data.items);
        }
      })
      .finally(() => {
        this.ctx.config.globalProperties.$wait.end("get/readings");
      });
  }

  getRelations(params) {
    this.ctx.config.globalProperties.$wait.start("get/relations");

    return this.ctx.$axios
      .get("/repos/arieslab/study-database/issues", {
        headers: {
          Accept: "application/vnd.github.squirrel-girl-preview",
        },
        params: {
          per_page: 5,
          ...params,
        },
      })
      .then((result) => {
        if (result && result.data) {
          return result.data;
        }
      })
      .finally(() => {
        this.ctx.config.globalProperties.$wait.end("get/relations");
      });
  }

  getReading(number) {
    this.ctx.config.globalProperties.$wait.start("get/reading");
    return this.ctx.$axios
      .get(`/repos/arieslab/study-database/issues/${number}`, {
        headers: {
          Accept: "application/vnd.github.squirrel-girl-preview",
        },
      })
      .then((result) => {
        if (result && result.data) {
          return this.setReading(result.data);
        }
      })
      .finally(() => {
        this.ctx.config.globalProperties.$wait.end("get/reading");
      });
  }

  create(payload) {
    this.ctx.config.globalProperties.$wait.start("post/readings");
    return this.ctx.$axios
      .post("/repos/arieslab/study-database/issues", payload)
      .then((result) => {
        if (result && result.data) {
          return this.setReadings(result.data);
        }
      })
      .finally(() => {
        this.ctx.config.globalProperties.$wait.end("post/readings");
      });
  }
}
