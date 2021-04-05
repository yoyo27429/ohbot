<script>
import CalendarDate from "@/components/datePicker/CalendarDate.vue";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
export default {
  props: {
    showMonth: {
      type: String,
    },
    pickedDate: {
      type: String,
      require: true,
    },
  },

  computed: {
    days() {
      return [
        ...this.previousMonthDays,
        ...this.currentMonthDays,
        ...this.nextMonthDays,
      ];
    },

    today() {
      // 目前選取的日期
      return dayjs(this.pickedDate).format("YYYY/MM/DD");
    },

    month() {
      const currentM = dayjs(this.showMonth).format("M");
      return Number(currentM);
    },

    year() {
      const currentY = dayjs(this.showMonth).format("YYYY");
      return Number(currentY);
    },

    numberOfDaysInMonth() {
      // 該日期月份的總天數，得到總天數後才能計算要補幾天的前一個月和後一個月
      return dayjs(this.showMonth).daysInMonth();
    },

    currentMonthDays() {
      // 該月份的所有日期陣列
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
        return {
          date: dayjs(`${this.year}/${this.month}/${index + 1}`).format(
            "YYYY/MM/DD"
          ),
          isCurrentMonth: true,
        };
      });
    },

    // 生成前一個月的日期
    previousMonthDays() {
      // 計算這個月份的第一天是禮拜幾
      const firstDayOfTheMonthWeekday = this.getWeekday(
        this.currentMonthDays[0].date
      );
      //   得到前一個月的月份
      const previousMonth = dayjs(`${this.year}/${this.month}/01`).subtract(
        1,
        "month"
      );

      // 如果(firstDayOfTheMonthWeekday === 0)則該月第一天為禮拜天
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;

      const previousMonthLastMondayDayOfMonth = dayjs(
        this.currentMonthDays[0].date
      )
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, index) => {
          return {
            date: dayjs(
              `${previousMonth.year()}/${previousMonth.month() +
                1}/${previousMonthLastMondayDayOfMonth + index}`
            ).format("YYYY/MM/DD"),
            isCurrentMonth: false,
          };
        }
      );
    },
    // 生成前一個月的日期得到下個月的日期
    nextMonthDays() {
      const lastDayOfTheMonthWeekday = this.getWeekday(
        `${this.year}/${this.month}/${this.currentMonthDays.length}`
      );

      const nextMonth = dayjs(`${this.year}/${this.month}/01`).add(1, "month");

      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday;

      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: dayjs(
            `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
          ).format("YYYY/MM/DD"),
          isCurrentMonth: false,
        };
      });
    },
  },

  methods: {
    getWeekday(date) {
      return dayjs(date).weekday();
    },

    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
  },
  components: {
    CalendarDate,
  },
};
</script>
<template>
  <div id="CalendarView">
    <ol class="days-grid">
      <CalendarDate
        v-for="day in days"
        :key="day.date"
        :day="day"
        :is-today="day.date === today"
        :current-month="!day.isCurrentMonth"
      />
    </ol>
  </div>
</template>

<style scoped lang="scss">
#CalendarView {
  margin-top: 10px;
}
</style>
