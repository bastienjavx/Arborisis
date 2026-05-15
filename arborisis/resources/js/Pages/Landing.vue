<script setup>
import { Head, Link } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue';
import ParticleField from '@/Components/Three/ParticleField.vue';
import SoundCard from '@/Components/SoundCard.vue';
import CreatorCard from '@/Components/CreatorCard.vue';

const SoundMap = defineAsyncComponent(() => import('@/Components/Map/SoundMap.vue'));

const props = defineProps({
    stats: Object,
    featuredSounds: {
        type: Array,
        default: () => [],
    },
    featuredCreators: {
        type: Array,
        default: () => [],
    },
});

// Reactive data — initialized from SSR props, then refreshed client-side
const featuredSounds = ref(props.featuredSounds);
const featuredCreators = ref(props.featuredCreators);
const soundsLoading = ref(props.featuredSounds.length === 0);
const creatorsLoading = ref(props.featuredCreators.length === 0);

const features = ref([
    {
        title: 'Carte sonore interactive',
        description: 'Explorez une carte mondiale des enregistrements naturels, filtrez par environnement et découvrez des sons uniques.',
        icon: 'M9 6.75002V15M15 9.00002V17.25M15.5031 20.7485L20.3781 18.311C20.7592 18.1204 21 17.7309 21 17.3047V4.82031C21 3.98401 20.1199 3.44007 19.3719 3.81408L15.5031 5.74847C15.1864 5.90683 14.8136 5.90683 14.4969 5.74847L9.50312 3.25158C9.1864 3.09322 8.8136 3.09322 8.49688 3.25158L3.62188 5.68908C3.24075 5.87965 3 6.26919 3 6.69531V19.1797C3 20.016 3.8801 20.56 4.62811 20.186L8.49688 18.2516C8.8136 18.0932 9.1864 18.0932 9.50312 18.2516L14.4969 20.7485C14.8136 20.9068 15.1864 20.9068 15.5031 20.7485Z',
    },
    {
        title: 'Lecteur audio immersif',
        description: 'Écoutez chaque son dans un lecteur premium avec visualisation, contrôles intuitifs et expérience contemplative.',
        icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
        title: 'Soutenez les créateurs',
        description: 'Avec les crédits ECHO, soutenez financièrement les enregistreurs et contribuez à l\'archive sonore collective.',
        icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    },
]);

const steps = ref([
    {
        number: '01',
        title: 'Explorez',
        description: 'Naviguez sur la carte ou parcourez les catégories pour découvrir des paysages sonores uniques.',
        icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7',
    },
    {
        number: '02',
        title: 'Écoutez',
        description: 'Lancez la lecture et laissez-vous transporter par les sons de la nature, capturés avec passion.',
        icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
        number: '03',
        title: 'Partagez',
        description: 'Publiez vos propres enregistrements et soutenez les créateurs qui enrichissent l\'archive.',
        icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    },
]);

const categories = ref([
    { name: 'Forêts', count: 0, color: 'bg-emerald-500/20 text-emerald-400' },
    { name: 'Océans', count: 0, color: 'bg-blue-500/20 text-blue-400' },
    { name: 'Montagnes', count: 0, color: 'bg-stone-500/20 text-stone-400' },
    { name: 'Rivières', count: 0, color: 'bg-cyan-500/20 text-cyan-400' },
    { name: 'Pluie', count: 0, color: 'bg-indigo-500/20 text-indigo-400' },
    { name: 'Crépuscule', count: 0, color: 'bg-amber-500/20 text-amber-400' },
]);

const mapSounds = ref([]);
const mapLoading = ref(true);
const mapError = ref(false);

const animatedStats = ref({ sounds: 0, creators: 0, countries: 0 });
const statsVisible = ref(false);
let statsObserver = null;

const prefersReducedMotion = ref(false);

const animateCount = (target, key, duration = 1500) => {
    if (prefersReducedMotion.value) {
        animatedStats.value[key] = target;
        return;
    }
    const start = performance.now();
    const from = 0;
    const to = target;

    const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        animatedStats.value[key] = Math.floor(from + (to - from) * eased);
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
};

const loadFeaturedSounds = async () => {
    if (featuredSounds.value.length > 0) {
        soundsLoading.value = false;
        return;
    }
    try {
        const response = await fetch('/api/sounds/featured');
        if (!response.ok) throw new Error('Failed to fetch sounds');
        featuredSounds.value = await response.json();
    } catch (e) {
        console.error('Failed to load featured sounds:', e);
    } finally {
        soundsLoading.value = false;
    }
};

const loadFeaturedCreators = async () => {
    if (featuredCreators.value.length > 0) {
        creatorsLoading.value = false;
        return;
    }
    try {
        const response = await fetch('/api/creators/featured');
        if (!response.ok) throw new Error('Failed to fetch creators');
        featuredCreators.value = await response.json();
    } catch (e) {
        console.error('Failed to load featured creators:', e);
    } finally {
        creatorsLoading.value = false;
    }
};

onMounted(() => {
    prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    loadMapSounds();
    loadFeaturedSounds();
    loadFeaturedCreators();

    const statsEl = document.getElementById('stats-section');
    if (statsEl) {
        statsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !statsVisible.value) {
                    statsVisible.value = true;
                    animateCount(props.stats.sounds, 'sounds');
                    animateCount(props.stats.creators, 'creators');
                    animateCount(props.stats.countries, 'countries');
                }
            });
        }, { threshold: 0.3 });
        statsObserver.observe(statsEl);
    }
});

onUnmounted(() => {
    if (statsObserver) statsObserver.disconnect();
});

const loadMapSounds = async () => {
    try {
        const response = await fetch('/api/map/sounds?limit=50');
        const data = await response.json();
        mapSounds.value = data.features ?? [];
    } catch (e) {
        console.error('Failed to load map sounds:', e);
        mapError.value = true;
    } finally {
        mapLoading.value = false;
    }
};
</script>

<template>
    <Head title="L'archive sonore du monde vivant" />
    <GuestLayout>
        <!-- Hero Section -->
        <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
            <!-- Cinematic nature photograph background -->
            <img
                src="/images/hero-leaf.webp"
                alt=""
                class="absolute inset-0 w-full h-full object-cover animate-ken-burns"
                style="filter: brightness(0.55) contrast(1.15) saturate(0.8);"
                fetchpriority="high"
                decoding="async"
            />

            <!-- Cinematic color grade overlay -->
            <div class="absolute inset-0 bg-arbor-night/70" />
            <div class="absolute inset-0 bg-gradient-to-t from-arbor-night via-transparent to-arbor-night/40" />
            <div class="absolute inset-0 bg-gradient-to-br from-arbor-emerald/10 via-transparent to-arbor-night/60" />

            <!-- Vignette effect -->
            <div
                class="absolute inset-0 pointer-events-none"
                style="background: radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(2, 15, 8, 0.7) 100%);"
            />

            <!-- Film grain texture -->
            <div class="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
                style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 512 512%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%225%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E'); background-repeat: repeat;"
            />

            <!-- Hero glow -->
            <div class="absolute inset-0 bg-hero-glow opacity-40" />

            <!-- Floating particles effect (Three.js) -->
            <ParticleField />

            <!-- Subtle scan-line effect -->
            <div class="absolute inset-0 opacity-[0.02] pointer-events-none"
                style="background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px);"
            />

            <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-arbor-cream leading-tight mb-6 animate-slide-up">
                    L'archive sonore<br />
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-arbor-emerald to-arbor-moss">du monde vivant</span>
                </h1>

                <p class="text-lg sm:text-xl text-arbor-sage max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style="animation-delay: 0.1s">
                    Explorez, écoutez et préservez les sons de la nature, capturés par une communauté de field recorders passionnés.
                </p>

                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style="animation-delay: 0.2s">
                    <Link href="/map" class="btn-primary text-base px-8 py-4 w-full sm:w-auto group">
                        <svg class="w-5 h-5 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        Explorer la carte sonore
                    </Link>
                    <Link href="/sounds" class="btn-secondary text-base px-8 py-4 w-full sm:w-auto group">
                        <svg class="w-5 h-5 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Écouter les derniers sons
                    </Link>
                </div>
            </div>

            <!-- Scroll indicator -->
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg class="w-6 h-6 text-arbor-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>

        <!-- Stats Section -->
        <section id="stats-section" class="py-20 border-y border-arbor-glass-border bg-arbor-deep/50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div class="text-center group">
                        <div class="font-display text-4xl font-bold text-arbor-emerald mb-2 transition-transform duration-300 group-hover:scale-110">
                            {{ animatedStats.sounds }}+
                        </div>
                        <div class="text-arbor-sage text-sm">Sons naturels</div>
                    </div>
                    <div class="text-center group">
                        <div class="font-display text-4xl font-bold text-arbor-emerald mb-2 transition-transform duration-300 group-hover:scale-110">
                            {{ animatedStats.creators }}+
                        </div>
                        <div class="text-arbor-sage text-sm">Créateurs</div>
                    </div>
                    <div class="text-center group">
                        <div class="font-display text-4xl font-bold text-arbor-emerald mb-2 transition-transform duration-300 group-hover:scale-110">
                            {{ animatedStats.countries }}+
                        </div>
                        <div class="text-arbor-sage text-sm">Pays</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Audio Demo Section -->
        <section class="py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4">
                        Écoutez avant d'explorer
                    </h2>
                    <p class="text-arbor-sage max-w-xl mx-auto">
                        Une sélection de sons récents pour vous transporter immédiatement dans la nature.
                    </p>
                </div>

                <!-- Loading skeletons -->
                <div v-if="soundsLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="n in 6" :key="n" class="glass-card overflow-hidden animate-pulse">
                        <div class="aspect-[16/9] bg-arbor-charcoal/60" />
                        <div class="p-4 space-y-3">
                            <div class="h-4 bg-arbor-charcoal/60 rounded w-3/4" />
                            <div class="h-3 bg-arbor-charcoal/60 rounded w-1/2" />
                        </div>
                    </div>
                </div>

                <!-- Sounds grid -->
                <div v-else-if="featuredSounds.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SoundCard
                        v-for="sound in featuredSounds"
                        :key="sound.id"
                        :sound="sound"
                    />
                </div>

                <!-- Empty state -->
                <div v-else class="text-center py-16">
                    <div class="w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    <h3 class="font-display text-lg text-arbor-cream mb-2">L'archive s'éveille</h3>
                    <p class="text-arbor-sage max-w-sm mx-auto mb-6">
                        Les premiers enregistrements arrivent. Soyez parmi les premiers à capturer et partager les sons de la nature.
                    </p>
                    <Link href="/record" class="btn-primary inline-flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                        </svg>
                        Enregistrer un son
                    </Link>
                </div>

                <div class="text-center mt-10">
                    <Link href="/sounds" class="btn-secondary inline-flex items-center gap-2 group">
                        Découvrir tous les sons
                        <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>

        <!-- Map Preview Section -->
        <section class="py-24 bg-arbor-deep/30">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-6">
                            Explorez le monde<br />à travers le son
                        </h2>
                        <p class="text-arbor-sage mb-8 leading-relaxed">
                            Chaque point sur la carte représente un moment capturé dans la nature :
                            le chant d'un oiseau à l'aube, le murmure d'une rivière, le vent dans les cimes.
                            Naviguez, filtrez et plongez dans l'acoustique des paysages.
                        </p>
                        <div class="flex flex-wrap gap-3 mb-8">
                            <span v-for="cat in categories" :key="cat.name" class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 hover:scale-105 cursor-default" :class="cat.color">
                                {{ cat.name }}
                            </span>
                        </div>
                        <Link href="/map" class="btn-primary group">
                            Ouvrir la carte
                            <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                    <div class="glass-card aspect-[16/9] relative overflow-hidden rounded-2xl border border-arbor-glass-border hover-lift group">
                        <div v-if="mapLoading" class="absolute inset-0 flex flex-col items-center justify-center bg-arbor-deep/80 z-10">
                            <div class="w-10 h-10 border-2 border-arbor-emerald/30 border-t-arbor-emerald rounded-full animate-spin mb-4"></div>
                            <p class="text-arbor-sage text-sm">Chargement de la carte...</p>
                        </div>
                        <SoundMap
                            v-else
                            :sounds="mapSounds"
                            :initial-zoom="2"
                            :initial-center="[25, 10]"
                        />
                        <!-- Overlay for seamless blend -->
                        <div class="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/5"></div>
                        <!-- Hover overlay -->
                        <Link
                            href="/map"
                            class="absolute inset-0 bg-arbor-night/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <span class="btn-primary">
                                Ouvrir la carte en plein écran
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <!-- How it works Section -->
        <section class="py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4">
                        Comment ça marche
                    </h2>
                    <p class="text-arbor-sage max-w-xl mx-auto">
                        Arborisis est simple. Trois étapes pour explorer et partager le monde sonore.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div
                        v-for="(step, index) in steps"
                        :key="step.number"
                        class="glass-card p-8 text-center hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 transition-all duration-300"
                        :style="`animation: fadeInUp 0.6s ease-out forwards; animation-delay: ${index * 0.15}s; opacity: 0;`"
                    >
                        <div class="font-display text-5xl text-arbor-emerald/20 font-bold mb-4">
                            {{ step.number }}
                        </div>
                        <div class="w-12 h-12 rounded-xl bg-arbor-moss/20 flex items-center justify-center mx-auto mb-6">
                            <svg class="w-6 h-6 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="step.icon" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-arbor-cream mb-3">{{ step.title }}</h3>
                        <p class="text-arbor-sage text-sm leading-relaxed">{{ step.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Creators Section -->
        <section class="py-24 bg-arbor-deep/30 border-y border-arbor-glass-border">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4">
                        Créateurs en avant
                    </h2>
                    <p class="text-arbor-sage max-w-xl mx-auto">
                        Rencontrez les enregistreurs qui donnent vie à l'archive.
                    </p>
                </div>

                <!-- Loading skeletons -->
                <div v-if="creatorsLoading" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div v-for="n in 3" :key="n" class="glass-card p-6 animate-pulse">
                        <div class="flex items-center gap-4">
                            <div class="w-16 h-16 rounded-full bg-arbor-charcoal/60 shrink-0" />
                            <div class="flex-1 space-y-2">
                                <div class="h-4 bg-arbor-charcoal/60 rounded w-2/3" />
                                <div class="h-3 bg-arbor-charcoal/60 rounded w-1/2" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Creators grid -->
                <div v-else-if="featuredCreators.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <CreatorCard
                        v-for="creator in featuredCreators"
                        :key="creator.id"
                        :creator="creator"
                        :featured-sound="creator.featured_sound"
                    />
                </div>

                <!-- Empty state -->
                <div v-else class="text-center py-16">
                    <div class="w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                    </div>
                    <h3 class="font-display text-lg text-arbor-cream mb-2">Les pionniers de l'écoute</h3>
                    <p class="text-arbor-sage max-w-sm mx-auto mb-6">
                        Les premiers créateurs rejoindront bientôt l'archive. Devenez l'un d'entre eux et faites entendre votre territoire.
                    </p>
                    <Link href="/register" class="btn-primary inline-flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        Rejoindre la communauté
                    </Link>
                </div>

                <div v-if="featuredCreators.length > 0" class="text-center mt-10">
                    <Link href="/creators" class="btn-secondary inline-flex items-center gap-2 group">
                        Voir tous les créateurs
                        <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>

        <!-- ECHO Section -->
        <section class="py-24">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="glass-card p-12 relative overflow-hidden hover-lift">
                    <div class="absolute top-0 right-0 w-64 h-64 bg-arbor-moss/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div class="relative z-10">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-arbor-emerald/20 mb-6 animate-glow-pulse">
                            <span class="text-2xl font-display font-bold text-arbor-emerald">E</span>
                        </div>
                        <h2 class="font-display text-3xl font-bold text-arbor-cream mb-4">
                            Soutenez avec ECHO
                        </h2>
                        <p class="text-arbor-sage mb-8 max-w-lg mx-auto leading-relaxed">
                            Les crédits ECHO vous permettent de soutenir directement les créateurs qui capturent
                            et partagent les sons de la nature. Un geste simple, un impact réel.
                        </p>
                        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/echo" class="btn-primary">
                                Découvrir ECHO
                            </Link>
                            <span class="text-xs text-arbor-sage">
                                Pas une cryptomonnaie. Pas un investissement.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Mission Section -->
        <section class="py-24 bg-arbor-deep/30 border-y border-arbor-glass-border">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="font-display text-3xl font-bold text-arbor-cream mb-6">
                    Préserver l'écoute du monde vivant
                </h2>
                <p class="text-arbor-sage leading-relaxed mb-8">
                    Arborisis naît d'une conviction : les paysages sonores naturels sont un patrimoine fragile
                    méritant d'être documenté, partagé et protégé. En donnant une voix aux espaces silencieux,
                    nous espérons susciter une écologie de l'attention et une reconnaissance envers
                    ceux qui consacrent leur temps à capturer ces instants éphémères.
                </p>
                <div class="flex items-center justify-center gap-2 text-arbor-emerald text-sm">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Respect de la nature. Confidentialité des lieux sensibles. Transparence.</span>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-24">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-6">
                    Rejoignez la communauté
                </h2>
                <p class="text-arbor-sage mb-10 max-w-xl mx-auto">
                    Créez votre profil, publiez vos premiers enregistrements et connectez-vous
                    avec d'autres passionnés de sons naturels.
                </p>
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/register" class="btn-primary text-base px-8 py-4">
                        Créer un compte gratuit
                    </Link>
                    <Link href="/login" class="btn-secondary text-base px-8 py-4">
                        J'ai déjà un compte
                    </Link>
                </div>
            </div>
        </section>
    </GuestLayout>
</template>
