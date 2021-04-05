<script>
import { reactive, ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import CalendarIndicator from "@/components/datePicker/CalendarIndicator.vue";
import HeaderIndicator from "@/components/HeaderIndicator.vue";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const weekDay = reactive([
      { name: "週檢視", value: 1 },
      { name: "日檢視", value: 0 },
    ]);
    const currentDate = computed(() => {
      return store.getters.selectedDate;
    });
    const month = computed(() => {
      return store.getters.selectedMonth;
    });
    const isWeek = ref(1);
    const userOpen = ref(false);
    const isCalendar = ref(false);
    const handleUserOpen = () => {
      userOpen.value = !userOpen.value;
    };
    const handlePreDay = () => {
      store.dispatch("handlePreDay");
    };
    const handleNextDay = () => {
      store.dispatch("handleNextDay");
    };
    watch(isWeek, () => {
      if (isWeek.value === 1) {
        router.push("/");
      } else {
        router.push("/day");
      }
    });
    console.log(route.path);
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
      isWeek,
      weekDay,
      userOpen,
      handleUserOpen,
      currentDate,
      isCalendar,
      month,
      handlePreDay,
      handleNextDay,
    };
  },
  components: { CalendarIndicator, HeaderIndicator },
};
</script>
<template>
  <div class="nav" v-show="!isCalendar">
    <div class="leftBox">
      <p class="weekTitle" v-show="isWeek">預約行事曆</p>
      <div class="daySelecter" v-show="!isWeek">
        <img
          class="arrow"
          @click="handlePreDay"
          src="@/assets/arrow-left.png"
          alt=""
        />
        <p class="dayTitle">{{ currentDate }}</p>
        <img
          class="arrow"
          @click="handleNextDay"
          src="@/assets/arrow-right.png"
          alt=""
        />
      </div>
    </div>
    <div class="rightBox">
      <select name="weekDay" v-model="isWeek" class="weekDay">
        <option v-for="item in weekDay" :key="item.name" :value="item.value">{{
          item.name
        }}</option>
      </select>
      <div id="userBox" @click="handleUserOpen" :class="{ active: userOpen }">
        <p>User</p>
        <img src="@/assets/arrow-down.svg" alt="" />
        <div class="triggerBar" v-show="userOpen">
          <p>User1</p>
          <p>登出</p>
        </div>
      </div>
    </div>
    <div class="calendarNav">
      <router-link to="/calendar" class="picker">
        <div class="imgBox">
          <img src="@/assets/calendar.svg" alt="" />
        </div>
      </router-link>
      <div class="week">
        <p>M</p>
        <p>T</p>
        <p>W</p>
        <p>T</p>
        <p>F</p>
        <p>S</p>
        <p>S</p>
        <HeaderIndicator />
      </div>
    </div>
  </div>
  <div class="nav calendarView" v-show="isCalendar">
    <CalendarIndicator />
  </div>
</template>

<style scoped lang="scss">
.nav {
  width: 100%;
  background-color: #fff;
  height: 130px;
  -webkit-box-shadow: 3px 0px 10px lightgray;
  -moz-box-shadow: 3px 0px 10px lightgray;
  box-shadow: 3px 0px 10px lightgray;
  position: fixed;
  top: 0px;
  z-index: 999;
  @media screen and(min-width:1200px) {
    height: 150px;
  }
  .leftBox {
    width: 35%;
    float: left;
    > .weekTitle {
      margin: 10%;
      width: 100%;
      float: left;
      @media screen and(min-width:1200px) {
        margin: 5%;
      }
    }
    .daySelecter {
      width: 100%;
      float: left;
      margin: 10%;
      @media screen and(min-width:1200px) {
        margin: 5%;
      }
      > .arrow {
        width: 10px;
        float: left;
        margin: 5px;
      }
      > .dayTitle {
        float: left;
      }
    }
  }
  > .rightBox {
    width: 65%;
    float: left;
    > .weekDay {
      width: 30%;
      height: 40px;
      float: right;
      position: absolute;
      right: 140px;
      background-color: #dedaf4;
      border-radius: 20px;
      padding: 10px 20px 10px 15px;
      color: #7f74b4;
      border: 0px;
      text-align: center;
      margin: 5px;
      @media screen and(min-width:1200px) {
        max-width: 200px;
        right: 250px;
      }
    }
    > .active {
      height: 80px;
    }
    > #userBox {
      position: absolute;
      width: 25%;
      // height: 40px;
      float: right;
      right: 0;
      background-color: #dedaf4;
      border-radius: 20px;
      padding: 10px 20px 10px 15px;
      color: #7f74b4;
      border: 0px;
      text-align: center;
      margin: 5px;
      @media screen and(min-width:1200px) {
        padding: 5px 20px 5px 15px;
        max-width: 200px;
      }
      > p {
        float: left;
        width: 80%;
      }
      > img {
        float: left;
        width: 20%;
        margin-top: 5px;
        @media screen and(min-width:1200px) {
          max-width: 20px;
        }
      }
      > .triggerBar {
        position: absolute;
        width: 100%;
        top: 20px;
        left: 0px;
        height: 60px;
        padding-top: 20px;
        //   background-color: #dedaf4;
        color: #7f74b4;
        z-index: 1;
        > p {
          display: block;
          height: 30px;
          width: 100%;
          z-index: 1;
          float: left;
        }
      }
    }
  }
  > .calendarNav {
    float: left;
    width: 100%;
    > .picker {
        width: 12.5%;
        float: left;
      > .imgBox {
        width: 40px;
        height: 40px;
        // display: inline;
        text-align: center;
        margin-left: 10px;
        border-radius: 20px;
        margin-top: 20px;
        background-color: #dedaf4;
        @media screen and(min-width:1200px) {
            margin-left: 50px;
        }
        > img {
          height: 25px;
          width: 25px;
          margin: 7.5px;
          text-align: center;
        }
      }
    }
    .week {
      width: 87.5%;
      float: left;
      > p {
        margin-top: 10px;
        font-weight: bold;
        width: 14.28%;
        float: left;
        text-align: center;
      }
    }
  }
}
</style>
