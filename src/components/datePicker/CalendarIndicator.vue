<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const month = computed(() => {
      return store.getters.selectedMonth;
    });
    return { month };
  },
};
</script>

<template>
  <router-link to="/" class="picker"
    ><img src="@/assets/calendar.svg" alt=""
  /></router-link>
  <h3>選擇日期</h3>
  <p class="month">{{ month }}</p>
  <div class="week">
    <p>M</p>
    <p>T</p>
    <p>W</p>
    <p>T</p>
    <p>F</p>
    <p>S</p>
    <p>S</p>
  </div>
</template>
<style scoped lang="scss">
.picker {
  float: left;
  width: 40px;
  height: 40px;
  display: block;
  margin: 10px;
  border-radius: 20px;
  background-color: #dedaf4;
  > img {
    height: 25px;
    width: 25px;
    margin: 7.5px;
    float: left;
  }
}
h3 {
  float: left;
  // margin-top: 10px;
  line-height: 60px;
}
.month {
  width: 100%;
  text-align: center;
  float: left;
}
.week {
  width: 100%;
  > p {
    margin-top: 10px;
    font-weight: bold;
    width: 14.28%;
    float: left;
    text-align: center;
  }
}
</style>
