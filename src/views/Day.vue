<script>
import { reactive } from "@vue/reactivity";
export default {
  setup() {
    const event = reactive([{ title: "美甲保養", time: 8, durition: 2 }]);
    return { event };
  },
};
</script>

<template>
  <div class="timeBox" v-for="item1 in 24" :key="item1">
    <div class="time">{{ item1 + ":00" }}</div>
    <div class="slot">
      <p
        class="event"
        v-if="item1 === event[0].time"
        :style="{ height: `${event[0].durition * 70}px` }"
      >
        {{ event[0].title }}
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.timeBox {
  width: 100%;
  height: 70px;
  float: left;
  background-color: #fff;
  border-bottom: 1px solid gray;
  > .time {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width: 12.5%;
    border-right: 1px solid gray;
    height: 70px;
    float: left;
    text-align: center;
    line-height: 110px;
  }
  > .slot {
    width: 87.5%;
    height: 70px;
    background-color: #f6f6f6;
    float: left;
    position: relative;

    > .event {
      width: 100%;
      background-color: rgba(229, 229, 229, 0.8);
      position: absolute;
      z-index: 9;
      border-radius: 10px;
    }
  }
}
</style>
