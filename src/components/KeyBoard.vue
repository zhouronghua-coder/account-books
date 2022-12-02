<script lang="ts" setup>
import { computed, ref } from "vue";
import { accountType, accountTypeEnum } from "@/types/account";
import { useCount } from "@/hooks/useCount";
import { createAccount } from "@/api/account";
import { getDateArr } from "@/utils";
import { showToast } from "./Toast";
import emiter from "@/utils/bus";
const accountTime = ref(getDateArr());
const remark = ref<string>("");
const show = ref<boolean>(false);
const { count, addCount, delCount } = useCount();
const handlePickerCancel = () => {
  show.value = false;
};
const handlePickerOk = () => {
  show.value = false;
};
const numList = ref<Array<string>>([
  "7",
  "8",
  "9",
  "4",
  "5",
  "6",
  "1",
  "2",
  "3",
  ".",
  "0",
]);

const props = defineProps<{
  modelValue: boolean;
  type: accountType;
  currentAccountInfo: {
    icon: string;
    type: string;
  };
}>();
const emit = defineEmits(["update:modelValue", "backHome"]);
const computedShow = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emit("update:modelValue", newVal);
  },
});
const handleClear = () => {
  count.value = "0";
  remark.value = "";
  return true;
};
const handleCompleted = async () => {
  if (count.value === "0") return;
  const res = await createAccount({
    ...props.currentAccountInfo,
    remark: remark.value,
    count: count.value,
    realCreateTime: accountTime.value.join("-"),
    isIncome: accountTypeEnum[props.type],
  });
  showToast({
    message: "记账成功",
    icon: "fa-clipboard-check",
  });
  emit("update:modelValue", false);
  emit("backHome");
  const month = accountTime.value.slice(0, -1).join("-");
  emiter.emit("refresh", month);
  console.log('refreshrefreshrefreshrefresh emit')
};
const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2024, 0, 1);
</script>
<template>
  <van-popup
    v-model:show="computedShow"
    position="bottom"
    :before-close="handleClear"
  >
    <div class="dark:bg-slate-800 bg-light-50">
      <div class="text-right p-2 text-xl">{{ count }}</div>
      <div class="p-2 my-1">
        <input
          class="w-full h-8 pl-2 outline-none bg-gray-100 dark:bg-slate-500 rounded-lg"
          placeholder="请输入备注"
          v-model="remark"
        />
      </div>
      <div class="grid h-64">
        <div
          class="block"
          v-for="num in numList"
          :key="num"
          @click="addCount(num)"
        >
          {{ num }}
        </div>
        <div class="block" @click="delCount">
          <i class="fa-solid fa-delete-left"></i>
        </div>
        <div
          :class="[
            type === 'income' ? 'bg-green-400' : 'bg-rose-400',
            'block',
            'design-2',
          ]"
          @click="handleCompleted"
        >
          完成
        </div>
        <div class="block design flex flex-col" @click="show = true">
          <i class="fa-solid fa-calendar-days"></i>
          <span class="text-sm mt-2">{{ accountTime.join("-") }}</span>
        </div>
      </div>
      <van-popup v-model:show="show" position="bottom">
        <van-date-picker
          v-model="accountTime"
          title="选择日期"
          @cancel="handlePickerCancel"
          @confirm="handlePickerOk"
          :minDate="minDate"
          :maxDate="maxDate"
        />
      </van-popup>
    </div>
  </van-popup>
</template>
<style scoped lang="less">
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
}
.block {
  @apply border-t border-r flex justify-center items-center;
}
.design {
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 4;
  grid-column-end: 5;
}
.design-2 {
  grid-row-start: 3;
  grid-row-end: 5;
  grid-column-start: 4;
  grid-column-end: 5;
}
</style>
