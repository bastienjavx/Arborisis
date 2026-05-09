import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            ssr: 'resources/js/ssr.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
            '@css': path.resolve(__dirname, 'resources/css'),
            'ziggy-js': path.resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Isolate heavy vendors into separate chunks
                    if (id.includes('node_modules')) {
                        if (id.includes('leaflet') || id.includes('markercluster')) {
                            return 'leaflet';
                        }
                        if (id.includes('inertiajs')) {
                            return 'inertia';
                        }
                        if (id.includes('vue') || id.includes('@vue')) {
                            return 'vue-vendor';
                        }
                        if (id.includes('pinia')) {
                            return 'pinia';
                        }
                        if (id.includes('ziggy')) {
                            return 'ziggy';
                        }
                        return 'vendor';
                    }
                },
            },
        },
    },

});
