<script>
import store from "@/store/index.js";
import dayjs from "dayjs";
export default {
  data() {
    return {
      selectDate: store.getters.selectDate,
    };
  },
  computed: {
    date() {
      const currentD = dayjs(this.selectDate).format("D");
      console.log(currentD);
      return Number(currentD);
    },

    month() {
      const currentM = dayjs(this.selectDate).format("M");
      return Number(currentM);
    },

    year() {
      const currentY = dayjs(this.selectDate).format("YYYY");
      return Number(currentY);
    },
    days() {
      return [
        // ...this.previousMonthDays,
        ...this.currentWeekDays,
        // ...this.nextMonthDays,
      ];
    },
    numberOfDayInWeek() {
        // 計算目前選擇的日期再星期幾，需要補幾天別週的
      const num = this.getWeekday(this.selectDate);
      return 8 - num;
    },
    currentWeekDays() {
      console.log("currentWeekDays");
      return [...Array(this.numberOfDayInWeek)].map((day, index) => {
        return {
          date: dayjs(`${this.year}/${this.month}/${this.date + index}`).format("DD"),
        };
      });
    },
  },
  methods: {
    getWeekday(date) {
      console.log("getweekday");
      return dayjs(date).weekday();
    },
  },
  watch:{
      days: ()=>{
          console.log(days);
      }
  }
};
</script>

<template>
  <span class="date" v-for="day in days" :key="day.date">{{ day.date }}</span>
</template>

<style scoped lang="scss">
.date{
    margin-top: 10px;
    font-weight: bold;
    width: 14.28%;
    float: left;
    text-align: center;
}
</style>
