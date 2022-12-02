<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import AccountItem from "./components/AccountItem.vue";
import DayItem from "./components/DayItem.vue";
import Empty from "./components/Empty.vue";
import Loading from "./components/Loading.vue";
import SelectMonthData from "./components/SelectMonthData.vue";
import { IAccountItem } from "@/types/account";
import { deleteAccount, getAccountByMonth } from "@/api/account";
import { getDateArr } from "@/utils";
import { showToast } from "@/components/Toast";
import emiter from "@/utils/bus";

const month = ref<string[]>(getDateArr("month"));
const accountList = ref<Array<any>>([]);
const onDel = async (id: number, dayTime: string) => {
  const dayData = accountList.value.find(
    (item) => item.realCreateTime === dayTime
  );
  const index = dayData.list.findIndex((item: IAccountItem) => item.id === id);
  if (index === -1) return;
  dayData.list.splice(index, 1);
  await deleteAccount(id);
  showToast("删除成功");
};
onMounted(() => {
  queryData(month.value.join("-"));
});
const queryData = async (month: string) => {
  loading.value = true;
  const res = (await getAccountByMonth(month)) as any;
  accountList.value = res;
  loading.value = false;
};
const showAccountList = computed(() => {
  return accountList.value.filter((item) => item.list.length > 0);
});
const changeMonthData = async () => {
  const res = (await getAccountByMonth(month.value.join("-"))) as any;
  accountList.value = res;
};
emiter.on("refresh", (month: any) => {
  queryData(month);
});
onBeforeUnmount(() => {
  emiter.all.clear();
});
const loading = ref<boolean>(false);
</script>
<template>
  <div class="p-4">
    <SelectMonthData v-model="month" @update="changeMonthData" />
    <div class="h-10"></div>
    <template v-if="!loading">
      <TransitionGroup name="list" tag="div" v-if="accountList.length">
        <DayItem
          v-for="dayItem in showAccountList"
          :key="dayItem.realCreateTime"
          :dayData="dayItem"
        >
          <TransitionGroup name="list" tag="div">
            <AccountItem
              v-for="item in dayItem.list"
              :accountItem="item"
              :key="item.id"
              @handleDleItem="onDel"
            />
          </TransitionGroup>
        </DayItem>
      </TransitionGroup>
      <Empty v-else />
    </template>
    <template v-else>
      <Loading />
    </template>
  </div>
</template>
<style scoped lang="less">
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translate(-200px);
}
</style>
