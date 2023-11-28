// vite.config.js
// https://github.com/FatehAK/vite-plugin-image-optimizer

import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
        base: '/Methed-StandUp-front/',
        plugins: [
            ViteImageOptimizer({
                /* pass your config */
                jpeg: {
                    // https://sharp.pixelplumbing.com/api-output#jpeg
                    quality: 80,
                },
                jpg: {
                    // https://sharp.pixelplumbing.com/api-output#jpeg
                    quality: 80,
                },

            }),
        ],
    };
});