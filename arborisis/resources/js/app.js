import '../css/app.css';
import './bootstrap';
import './echo';
import { registerServiceWorker } from './pwa';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import MiniPlayer from '@/Components/Audio/MiniPlayer.vue';
import CookieBanner from '@/Components/CookieBanner.vue';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pinia = createPinia();

if (typeof window !== 'undefined') {
    registerServiceWorker();
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        return createApp({
            render: () => h('div', { class: 'relative' }, [
                h(App, props),
                h(MiniPlayer),
                h(CookieBanner),
            ]),
        })
            .use(plugin)
            .use(pinia)
            .use(ZiggyVue)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
