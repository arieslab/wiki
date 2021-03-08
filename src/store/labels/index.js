import { reactive } from "vue";
/**
 * Schedules are md files called Schedule-2020
 */
export default class Labels {
  constructor(ctx) {
    this.ctx = ctx;

    this.state = reactive({
      labels: null,
      authors: null,
    });
  }

  setLabels(labels) {
    this.state.labels = labels;
    return labels;
  }

  setAuthors(authors) {
    this.state.authors = authors;
    return authors;
  }

  getLabels() {
    return this.ctx.$axios
      .get("/repos/arieslab/study-database/labels")
      .then((result) => {
        if (result && result.data) {
          this.setAuthors(
            result.data
              .filter((i) => i.name.startsWith("author:"))
              .map((i) => ({ ...i, name: i.name.replace("author:", "") })),
          );

          return this.setLabels(
            result.data.filter((i) => !i.name.startsWith("author:")),
          );
        }
      });
  }
}
