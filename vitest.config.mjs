// vitest.config.mjs
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.mjs'
import alias from '@rollup/plugin-alias';

export default mergeConfig(viteConfig, defineConfig({
    test: {
        resolver: {
            aliases: {
                '@': '/src', // Adjust the alias path according to your project structure
            },
        },
        // ... other test configurations
    },
}))
