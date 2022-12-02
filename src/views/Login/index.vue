<script lang="ts" setup>
import { ref } from "vue";

const username = ref("");
const password = ref("");
const onSubmit = (values) => {
  console.log("submit", values);
};
</script>
<template>
  <div class="bg h-[100vh] fcc">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div class="mt-4">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<style scoped lang="less">
.bg {
  background-image: url("../../../public/bg.jpg");
  object-fit: cover;
}
</style>
