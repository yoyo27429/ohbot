<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { onMounted } from "@vue/runtime-core";
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const initCurrentDate = () => {
      store.dispatch("handleInitDate");
    };
    onMounted(() => {
      initCurrentDate();
    });
    return {};
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<template>
  <Header />
  <div class="viewBox">
    <router-view />
  </div>
  <Footer />
</template>

<style lang="scss">
* {
  padding: 0px;
  margin: 0px;
}
.viewBox {
  margin-top: 130px;
  margin-bottom: 60px;
  overflow: auto;
  @media screen and(min-width:1200px) {
    margin-top: 150px;
  }
}
</style>
