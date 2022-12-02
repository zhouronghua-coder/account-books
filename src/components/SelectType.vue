<!--
 * @Author: zhouronghua zhouronghua01@qq.com
 * @Date: 2022-11-27 14:45:25
 * @LastEditors: zhouronghua zhouronghua01@qq.com
 * @LastEditTime: 2022-12-01 21:50:56
 * @FilePath: /account-books/src/components/SelectType.vue
 * @Description: 选择收入、支出类别
-->
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { accountType } from "@/types/account";
import KeyBoard from "./KeyBoard.vue";
import { useRouter } from "vue-router";
import { incomeTypeList, outcomeTypeList } from "@/utils/const";
const router = useRouter();
const type = ref<accountType>("expend");
const emit = defineEmits(["back"]);
const showKeyBoard = ref<boolean>(false);
const currentAccountInfo = reactive({ type: "", icon: "" });

const handleOpenKeyBoard = (name: string, icon: string) => {
  currentAccountInfo.type = name;
  currentAccountInfo.icon = icon;
  showKeyBoard.value = true;
};
</script>
<template>
  <div class="h-[100vh] bg-white dark:bg-slate-800">
    <div class="p-2">
      <i
        class="fa-solid fa-chevron-left text-slate-800 dark:text-white"
        @click="emit('back')"
      ></i>
    </div>
    <div
      class="mx-12 py-2 px-8 bg-light-800 rounded-md fbc text-stroke-gray-400"
    >
      <div
        class="px-8 duration-100"
        :class="{ active: type === 'expend' }"
        @click="type = 'expend'"
      >
        支出
      </div>
      <div
        class="px-8 duration-100"
        :class="{ active2: type === 'income' }"
        @click="type = 'income'"
      >
        收入
      </div>
    </div>
    <div class="p-4">
      <div v-show="type === 'expend'" class="flex flex-wrap">
        <div
          v-for="(item, index) in incomeTypeList"
          :key="index"
          class="flex flex-col items-center"
          @click="handleOpenKeyBoard(item.name, item.icon)"
        >
          <div class="h-12 w-12 m-2 rounded-full bg-rose-400 fcc text-white">
            <i :class="[item.icon]" class="fa-solid text-xl"></i>
          </div>
          <div class="text-sm font-light text-black dark:text-white">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div v-show="type === 'income'" class="flex flex-wrap">
        <div
          v-for="(item, index) in outcomeTypeList"
          :key="index"
          class="flex flex-col items-center"
          @click="handleOpenKeyBoard(item.name, item.icon)"
        >
          <div class="h-12 w-12 m-2 rounded-full bg-green-400 fcc text-white">
            <i :class="[item.icon]" class="fa-solid text-xl"></i>
          </div>
          <div class="text-sm font-light text-black dark:text-white">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <KeyBoard
    v-model="showKeyBoard"
    :type="type"
    :currentAccountInfo="currentAccountInfo"
    @backHome="emit('back')"
  />
</template>
<style scoped lang="less">
.active {
  @apply bg-rose-400 rounded-md text-white;
}
.active2 {
  @apply bg-green-400 rounded-md text-white;
}
</style>
