<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const options = reactive({
  xAxis: {
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [],
      type: "line",
      smooth: true,
      lineStyle: {
        color: "#34D399",
        width: 3,
      },
      itemStyle: {
        color: "#34D399",
      },
    },
    {
      data: [],
      type: "line",
      smooth: true,
      lineStyle: {
        color: "#FB7185",
        width: 3,
      },
      itemStyle: {
        color: "#FB7185",
      },
    },
  ],
  dark: true,
});
onMounted(() => {});
</script>
<template>
  <div class="w-full h-128">
    <div class="p-2">
      <i
        class="fa-solid fa-chevron-left text-slate-800 dark:text-white"
        @click="router.push('/home')"
      ></i>
    </div>
    <VChart :option="options" />
  </div>
</template>
<style scoped lang="less"></style>
