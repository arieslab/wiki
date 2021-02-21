import { reactive } from "vue";
/**
 * Schedules are md files called Schedule-2020
 */
export default class Labels {
  constructor(ctx) {
    this.ctx = ctx;

    this.state = reactive({
      labels: null,
    });
  }

  setLabels(labels) {
    this.state.labels = labels;
    return labels;
  }

  getLabels() {
    return this.ctx.$axios
      .get("/repos/arieslab/study-database/labels")
      .then((result) => {
        if (result && result.data) {
          return this.setLabels(result.data);
        }
      });
  }
}
