import { reactive } from "vue";
/**
 * Schedules are md files called Schedule-2020
 */
export default class Schedule {
  constructor(ctx) {
    this.ctx = ctx;

    this.state = reactive({
      codes: null,
      schedule: null,
    });
  }

  setCodes(codes) {
    this.state.codes = codes;
    return codes;
  }

  setSchedule(schedule) {
    this.state.schedule = schedule;
    return schedule;
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

  getSchedule({ git_url }) {
    return this.ctx.$axios.get(git_url).then((result) => {
      return this.setSchedule(result.data);
    });
  }
}
