// vite.config.js
// https://github.com/FatehAK/vite-plugin-image-optimizer

import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(() => {
    return {
        build:{
          rollupOptions: {
            input:{
              main: "index.html",
              qr: "qr.html"
            }
          }
        },
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