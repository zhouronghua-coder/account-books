<script lang="ts" setup>
import { changeTheme } from "../utils";
import { ref } from "vue";
import { useRouter } from "vue-router";
import SelectType from "@/components/SelectType.vue";
const active = ref<boolean>(false);
const showPopover = ref(false);
const router = useRouter();
// 通过 actions 属性来定义菜单选项
const onSelect = (action: string) => {
  console.log(action);
};
const actions = [{ text: "选项一" }, { text: "选项二" }, { text: "选项三" }];
</script>
<template>
  <div
    class="fbc fixed bottom-0 w-full py-4 px-16 h-16 bg-light-500 dark:bg-slate-800 text-black dark:text-light-50"
  >
    <div @click="changeTheme" class="w-8 h-8 duration-300 fcc">
      <i class="fa-solid fa-circle-half-stroke"></i>
    </div>
    <div @click="active = true" class="w-8 h-8 duration-300 fcc active">
      <i class="fa-solid fa-plus"></i>
    </div>
    <div class="w-8 h-8 duration-300 fcc">
      <van-popover
        v-model:show="showPopover"
        :actions="actions"
        @select="onSelect"
        placement="top"
      >
        <div
          class="bg-light-50 dark:(bg-slate-800 text-white) text-gray-500 w-24"
        >
          <div class="h2 px-4 py-2 fcc text-sm" @click="router.push('/me')">
            我的
          </div>
        </div>
        <template #reference>
          <i class="fa-solid fa-ellipsis"></i>
        </template>
      </van-popover>
    </div>
  </div>
  <van-popup v-model:show="active" position="bottom">
    <SelectType @back="active = false"></SelectType>
  </van-popup>
</template>
<style scoped lang="less">
.active {
  @apply bg-green-400 p-2 rounded text-white;
}
</style>
