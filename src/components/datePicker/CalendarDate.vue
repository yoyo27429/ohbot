<script>
import { computed, ref, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import dayjs from "dayjs";
export default {
  props: {
    day: { type: Object, required: true },
    isToday: { type: Boolean, required: false },
    currentMonth: { type: Boolean, required: false },
  },
  setup(props) {
    const store = useStore();
    const day = props.day;
    const isToday = props.isToday;
    const currentDate = ref("");
    const currentMonth = props.currentMonth;
    const chooseDate = (date) => {
      store.dispatch("handleChooseDate", date);
    };
    const dateActive = () => {
      //   isChoose.value = !isChoose.value;
    };
    watch(
      () => store.getters.selectedDate,
      () => {
        currentDate.value = store.getters.selectedDate;
        // console.log(store.getters.selectedDate);
      }
    );
    const date = computed(() => {
      return dayjs(day.date).format("D");
    });
    return {
      date,
      isToday,
      currentMonth,
      chooseDate,
      dateActive,
      currentDate,
    };
  },
};
</script>

<template>
  <li
    :class="[
      'dateItem',
      {
        'calendar-day': isToday,
        'calendar-month': !currentMonth,
        'calendar-active': currentDate === day.date,
      },
    ]"
    @click="dateActive"
  >
    <span @click="chooseDate(day.date)">{{ date }}</span>
  </li>
</template>
<style lang="scss" scoped>
.dateItem {
  margin-top: 10px;
  font-weight: bold;
  width: 14.28%;
  float: left;
  text-align: center;
  list-style-type: none;
  color: #d1d1d1;
}
.calendar-day {
  background-color: #7f74b4;
  border-radius: 20px;
  > span {
    color: #fff;
  }
}
.calendar-month {
  color: #7e7e7e;
}
.calendar-active {
  background-color: #dedaf4;
  border-radius: 20px;
}
</style>
