<script lang="ts" setup>
import { computed, ref } from "vue";

interface IProps {
  modelValue: string[];
}
interface IEmits {
  (e: "update"): void;
  (e: "update:modelValue", month: string[]): void;
}
const show = ref<boolean>(false);
const emit = defineEmits<IEmits>();
const props = defineProps<IProps>();
const handlePickerCancel = () => {
  show.value = false;
};
const handlePickerOk = () => {
  show.value = false;
  emit("update");
};
const monthData = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
<template>
  <div class="p-2 fixed w-full bg-light-200 dark:bg-slate-600 z-50 top-0 h-10">
    <span @click="show = true">{{ monthData.join("-") }}</span>
    <i
      class="fa-solid fa-chevron-down ml-2 text-sm transform duration-400"
      :class="[show ? 'rotate-z-180' : '']"
    ></i>
    <i class="fa-solid fa-flag-pennant"></i>
  </div>
  <van-popup v-model:show="show" position="bottom">
    <van-date-picker
      v-model="monthData"
      title="选择日期"
      :columnsType="['year', 'month']"
      @cancel="handlePickerCancel"
      @confirm="handlePickerOk"
    />
  </van-popup>
</template>
<style scoped lang="less"></style>
