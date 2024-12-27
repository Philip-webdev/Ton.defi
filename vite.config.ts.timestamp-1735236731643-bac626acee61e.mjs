// vite.config.ts
import { defineConfig } from "file:///C:/Users/USER/Ton.defi/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/USER/Ton.defi/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { nodePolyfills } from "file:///C:/Users/USER/Ton.defi/node_modules/vite-plugin-node-polyfills/dist/index.js";
import wasm from "file:///C:/Users/USER/Ton.defi/node_modules/vite-plugin-wasm/exports/import.mjs";
var _a;
var vite_config_default = defineConfig({
  plugins: [react(), nodePolyfills(), wasm()],
  base: (_a = ((process.env.GITHUB_REPOSITORY ?? "") + "/").match(/(\/.*)/)) == null ? void 0 : _a[1]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVU0VSXFxcXFRvbi5kZWZpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVU0VSXFxcXFRvbi5kZWZpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9VU0VSL1Rvbi5kZWZpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSBcInZpdGUtcGx1Z2luLW5vZGUtcG9seWZpbGxzXCI7XHJcbiBpbXBvcnQgd2FzbSBmcm9tICd2aXRlLXBsdWdpbi13YXNtJztcclxuXHJcbiBcclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKSwgbm9kZVBvbHlmaWxscygpLHdhc20oKV0sXHJcbiAgYmFzZTogKChwcm9jZXNzLmVudi5HSVRIVUJfUkVQT1NJVE9SWSA/PyBcIlwiKSArIFwiL1wiKS5tYXRjaCgvKFxcLy4qKS8pPy5bMV0sXHJcbiAgXHJcbn0pO1xyXG5cclxuXHJcbiAiXSwKICAibWFwcGluZ3MiOiAiO0FBQTRQLFNBQVMsb0JBQW9CO0FBQ3pSLE9BQU8sV0FBVztBQUNsQixTQUFTLHFCQUFxQjtBQUM3QixPQUFPLFVBQVU7QUFIbEI7QUFPQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLGNBQWMsR0FBRSxLQUFLLENBQUM7QUFBQSxFQUN6QyxPQUFRLGVBQVEsSUFBSSxxQkFBcUIsTUFBTSxLQUFLLE1BQU0sUUFBUSxNQUExRCxtQkFBOEQ7QUFFeEUsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
