<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import "@/assets/style.css";
import "@/assets/vendors/bootstrap-icons/bootstrap-icons.css" ;


export default {
  components: {
    AppHeader,
    AppFooter
  },
};
</script>
<template>
  
  <div id="app">
    <AppHeader />
    <div>
      <router-view />
    </div>
    <AppFooter />
  </div>
</template>
<style>
.page {
  max-width: 500px;
  margin: auto;
}
</style>