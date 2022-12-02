<script lang="ts" setup>
import { onBeforeUnmount, ref } from "vue";
import { IAccountItem } from "@/types/account";
import emiter from "@/utils/bus";
let startX: number = 0;
const isDel = ref<boolean>(false);
const touchStart = (e: TouchEvent) => {
  startX = e.touches[0].clientX;
};
const touchEnd = (e: TouchEvent) => {
  const endX: number = e.changedTouches[0].clientX;
  if (Math.abs(endX - startX) < 50) return;
  if (startX > endX) {
    isDel.value = true;
    emiter.emit("backnormalState", accountItem.id);
  } else isDel.value = false;
};
const { accountItem } = defineProps<{
  accountItem: IAccountItem;
}>();
const emit = defineEmits(["handleDleItem"]);
const handleDelete = (id: number, dayTime: string) => {
  emit("handleDleItem", id, dayTime);
};
emiter.on("backnormalState", (id) => {
  console.log('123 back normal state')
  if (accountItem.id !== id) {
    isDel.value = false;
  }
});
onBeforeUnmount(() => {
  emiter.all.clear();
});
</script>
<template>
  <div
    class="bg-white dark:bg-slate-800 p-2 relative overflow-hidden shadow-current last:(rounded-b border-none) border-b"
    @touchstart.capture="touchStart"
    @touchend.capture="touchEnd"
  >
    <div
      class="fbc transform duration-300"
      :class="{ '-translate-x-8': isDel }"
    >
      <div class="w-8 mr-2 fcc">
        <i class="fa-solid" :class="[accountItem.icon]"></i>
      </div>
      <div class="flex-1">
        <div class="fbc">
          <span> {{ accountItem.type }} </span>
          <span v-if="accountItem.isIncome" class="text-green-400">
            ¥{{ accountItem.count }}
          </span>
          <span v-else class="text-rose-400"> ¥{{ accountItem.count }} </span>
        </div>
        <div class="fbc text-gray-300 text-sm">
          <span class="truncate max-w-64"> {{ accountItem.remark }} </span>
        </div>
      </div>
      <div
        @click="
          handleDelete(accountItem.id as number, accountItem.realCreateTime)
        "
        class="text-pink-400 w-4 pr-1 h-full absolute -right-8 fcc"
      >
        <i class="fa-solid fa-delete-left"></i>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less"></style>
