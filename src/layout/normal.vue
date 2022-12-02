<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
</script>
<template>
  <div class="bg-light-200 dark:bg-slate-600 min-h-[100vh]">
    <div class="pb-16">
      <router-view></router-view>
    </div>
    <NavBar></NavBar>
  </div>
</template>
<style scoped lang="less"></style>
