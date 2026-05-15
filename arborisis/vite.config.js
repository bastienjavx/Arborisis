import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
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
        VitePWA({
            strategies: 'injectManifest',
            srcDir: 'resources/js',
            filename: 'sw.js',
            injectManifest: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
                globDirectory: 'public',
                maximumFileSizeToCacheInBytes: 8000000,
            },
            manifest: false, // We use our own public/manifest.json
            injectRegister: false, // We register manually in pwa.js
            devOptions: {
                enabled: false, // Disable in dev to avoid cache issues
            },
            workbox: {
                navigateFallback: '/offline',
                navigateFallbackDenylist: [/^\/(build|js|css|fonts|images|storage|api|webhooks|radio\/stream)/],
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
                        if (id.includes('workbox')) {
                            return 'workbox';
                        }
                        if (id.includes('three')) {
                            return 'threejs';
                        }
                        return 'vendor';
                    }
                },
            },
        },
    },
});
