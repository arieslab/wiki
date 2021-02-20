import { reactive } from "vue";

export default class Schedule {
  constructor(ctx) {
    this.ctx = ctx;

    this.state = reactive({
      codes: null,
    });
  }

  setCodes(codes) {
    this.state.codes = codes;
  }

  getCodes() {
    return this.ctx.$axios
      .get("/repos/arieslab/study-group/contents")
      .then((result) => {
        if (result && result.data) {
          const codes = result.data.filter((i) =>
            i.name.startsWith("Schedule-"),
          );
          return this.setCodes(codes);
        }
      });
  }
}
