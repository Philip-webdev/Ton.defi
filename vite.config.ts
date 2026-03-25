import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
 import wasm from 'vite-plugin-wasm';
import tailwindcss from '@tailwindcss/vite';
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills(),wasm(),  tailwindcss(),],
  base: ((process.env.GITHUB_REPOSITORY ?? "") + "/").match(/(\/.*)/)?.[1],
  build: {
    target: 'esnext',
     rollupOptions: {
    external: ['helper'],
  } 
},
  css: {
    devSourcemap: true,
  },
});


 