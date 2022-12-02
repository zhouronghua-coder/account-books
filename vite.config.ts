import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // esbuild: {
  //   jsxFactory: "h",
  //   jsxFragment: "Fragment",
  // },
  plugins: [
    vue(),
    vueJsx(),
    WindiCSS(),
    components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@views": path.resolve(__dirname, "./src/views"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // 选项写法
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path) => {
          console.log(path);
          return path.replace(/^\/api/, "");
        },
      },
    },
  },
});
