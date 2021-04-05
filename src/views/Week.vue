<script>
export default {
  setup() {},
  components: {},
};
</script>

<template>
  <div class="timeBox" v-for="item1 in 24" :key="item1">
    <!-- 產生一行每一小時的區塊 -->
    <div class="dayBox" v-for="item in 8" :key="item">
      <!-- 產生每一天的小區塊，並在第一個區塊寫上該時段的時間 -->
      <p class="timeSlot" v-show="item === 1">{{ item1 + ":00" }}</p>
      <div class="event" v-if="(item === 2) && (item1 === 8)">美甲保養</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.timeBox {
  width: 100%;
  height: 70px;
  float: left;
  background-color: #fff;
  border-bottom: 1px solid lightgray;
  > .dayBox {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width: 12.5%;
    border-right: 1px solid lightgray;
    height: 70px;
    float: left;
    position: relative;
    > .timeSlot {
      text-align: center;
      line-height: 110px;
    }
    >.event{
      background-color: rgba(229,229,229,0.8);
      height: 140px;
      border-radius: 10px;
      position: absolute;
      text-align: center;
      // padding: 0px 2px 0px 2px;
      width: 100%;
    }
  }
}
</style>
