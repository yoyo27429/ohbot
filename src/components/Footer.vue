<script>
import { computed, onMounted, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";
import dayjs from 'dayjs'
export default {
  setup() {
    const isCalendar = ref(false);
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const submitNewDate = () => {
      const date = store.getters.selectedDate;
      // console.log(dayjs(date).format("YYYYMMDD"));
      router.push('/')
    };
    watch(
      () => route.path,
      () => {
        const rp = route.path.split("/")[1];
        if (rp === "calendar") {
          isCalendar.value = true;
        } else isCalendar.value = false;
      }
    );
    return {
      isCalendar,
      submitNewDate,
    };
  },
};
</script>
<template>
  <div id="footer">
    <a class="btn" v-show="!isCalendar" href="">＋新增預約</a>
    <a class="btn" v-show="isCalendar" @click="submitNewDate" href="javascript:;">確認</a>
  </div>
</template>

<style scoped lang="scss">
#footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 60px;
  z-index: 999;
  background-color: #fff;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 41%,
    rgba(255, 255, 255, 0.6) 80%
  );
  background: -moz-linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 41%,
    rgba(255, 255, 255, 0.6) 80%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 41%,
    rgba(255, 255, 255, 0.6) 80%
  );
  background: -o-linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 41%,
    rgba(255, 255, 255, 0.6) 80%
  );

  > .btn {
    width: 30%;
    height: 40px;
    margin-left: 35%;
    margin-top: 10px;
    text-align: center;
    display: block;
    background-color: #7f74b4;
    text-decoration: none;
    color: #fff;
    line-height: 40px;
    border-radius: 10px;
    -webkit-box-shadow: 0px 3px 10px gray;
    -moz-box-shadow: 0px 3px 10px gray;
    box-shadow: 0px 3px 10px gray;
  }
}
</style>
