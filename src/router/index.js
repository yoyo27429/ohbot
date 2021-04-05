import { createRouter, createWebHistory } from "vue-router";
import Week from "../views/Week.vue";
import Day from "../views/Day.vue";
import CalendarSelectView from "../components/datePicker/CalendarSelectView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Week,
  },
  {
    path: "/day",
    name: "Day",
    component: Day,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: CalendarSelectView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
