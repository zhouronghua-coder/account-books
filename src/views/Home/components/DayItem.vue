<!--
 * @Author: zhouronghua zhouronghua01@qq.com
 * @Date: 2022-11-27 16:15:21
 * @LastEditors: zhouronghua zhouronghua01@qq.com
 * @LastEditTime: 2022-12-01 14:49:21
 * @FilePath: /account-books/src/views/Home/components/DayItem.vue
 * @Description: 一天的数据
-->
<script lang="ts" setup>
const { dayData } = defineProps<{
  dayData: {
    allIncome: number;
    allExpend: number;
    realCreateTime: string;
  };
}>();
</script>
<template>
  <div class="mb-3">
    <div
      class="dark:bg-violet-800 bg-violet-200 rounded-t-xl flex fbc text-light-50 p-2 font-semibold"
    >
      <div class="fbc">
        <span class="mr-6 w-24"
          ><i class="fa-sharp fa-solid fa-plus text-green-400"></i> ¥{{
            dayData.allIncome
          }}</span
        >
        <span>
          <i class="fa-sharp fa-solid fa-minus text-rose-400 mr-2"></i>¥{{
            dayData.allExpend
          }}</span
        >
      </div>
      <div>{{ dayData.realCreateTime }}</div>
    </div>
    <slot></slot>
  </div>
</template>
<style scoped lang="less"></style>
