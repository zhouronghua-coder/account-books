import { createApp } from "vue";
import App from "./App.vue";
import "virtual:windi.css";
import "./styles/global.less";
import route from "./route";
import * as echarts from "echarts";
import VueEcharts from "vue-echarts";

const app = createApp(App);
app.config.globalProperties.$echarts = echarts;
app.component("VChart", VueEcharts);
app.use(route).mount("#app");
