<script>
import Calendar from "@/components/datePicker/Calendar.vue";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import dayjs from "dayjs";
export default {
  setup() {
    const store = useStore();
    const slectedDate = computed(() => {
      //   console.log(store.getters.selectedDate);
      return store.getters.selectedDate;
    });
    const currentMonth = computed(() => {
      //   console.log(store.getters.selectedMonth);
      return store.getters.selectedMonth;
    });
    const nextMonth = computed(() => {
      const nextMonth = dayjs(store.getters.selectedMonth)
        .add(1, "month")
        .format("YYYY/MM");
      return nextMonth;
    });
    return { slectedDate, currentMonth, nextMonth };
  },
  components: {
    Calendar,
  },
};
</script>
<template>
  <Calendar :picked-date="slectedDate" :show-month="currentMonth" />

  <span class="month">{{ nextMonth }}</span>
  <Calendar :picked-date="slectedDate" :show-month="nextMonth" />
</template>

<style scoped>
.month {
  width: 100%;
  text-align: center;
  float: left;
  margin-top: 30px;
}
</style>
