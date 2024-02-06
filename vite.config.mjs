// vite.config.mjs
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import alias from '@rollup/plugin-alias';

export default defineConfig({
    plugins: [
        Vue(),
        alias({
            entries: [
                { find: '@', replacement: '/src' }, // Adjust the alias path according to your project structure
            ],
        }),
    ],
})
