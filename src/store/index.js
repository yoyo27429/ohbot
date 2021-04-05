import { createStore } from "vuex";
import dayjs from "dayjs";
export default createStore({
  state: {
    selectedDate: dayjs("2021/04/23"),
    selectedMonth: "yyyy/mm",
  },
  actions: {
    handleNextDay(context) {
      const newDay = dayjs(this.state.selectedDate).add(1,'day').format("YYYY/MM/DD");
      context.commit("nextDay", newDay);;
    },
    handlePreDay(context){
      const newDay = dayjs(this.state.selectedDate).subtract(1, "day").format("YYYY/MM/DD");
      context.commit("preDay", newDay)
    },
    handleInitDate(context){
      const day = dayjs().format("YYYY/MM/DD");
      context.commit("initCurrentDate", day);
    },
    handleChooseDate(context, date){
      context.commit("changeDate", date);
    }
  },
  mutations: {
    preDay(state, date) {
      state.selectedDate = date;
    },
    nextDay(state, date) {
      state.selectedDate = date;
    },
    initCurrentDate(state, day){
      state.selectedDate = day;
      state.selectedMonth = dayjs(day).format("YYYY/MM");
    },
    changeDate(state, date){
      state.selectedDate = date;
      state.selectedMonth = dayjs(date).format("YYYY/MM")
    }
  },
  getters: {
    selectedDate(state) {
      return dayjs(state.selectedDate).format("YYYY/MM/DD");
    },
    selectedMonth(state) {
      return state.selectedMonth;
    },
  },
});
