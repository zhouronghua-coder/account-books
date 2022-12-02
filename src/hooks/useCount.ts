/*
 * @Author: zhouronghua zhouronghua01@qq.com
 * @Date: 2022-11-27 16:05:41
 * @LastEditors: zhouronghua zhouronghua01@qq.com
 * @LastEditTime: 2022-11-27 16:06:45
 * @FilePath: /account-books/src/hooks/useCount.ts
 * @Description: 计算器输入hook
 */
import { ref } from "vue";
export function useCount() {
  const count = ref<string>("0");
  const addCount = (num: string) => {
    if (count.value.length === 1 && count.value === "0" && num !== ".")
      return (count.value = num);
    if (num === "." && count.value.includes(".")) return;
    if (count.value.includes(".") && count.value.split(".")[1].length === 2)
      return;
    count.value += num;
  };
  const delCount = () => {
    count.value = count.value.slice(0, -1);
    if (count.value.length === 0) count.value = "0";
  };
  return {
    count,
    addCount,
    delCount,
  };
}
