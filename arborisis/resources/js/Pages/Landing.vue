<script setup>
import { Head, Link } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import SoundMap from '@/Components/Map/SoundMap.vue';
import { ref, onMounted } from 'vue';

const props = defineProps({
    stats: Object,
});

const features = ref([
    {
        title: 'Carte sonore interactive',
        description: 'Explorez une carte mondiale des enregistrements naturels, filtrez par environnement et découvrez des sons uniques.',
        icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7',
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

onMounted(() => {
    loadMapSounds();
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
    <Head title="Accueil" />
    <GuestLayout>
        <!-- Hero Section -->
        <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
            <!-- Background gradient -->
            <div class="absolute inset-0 bg-gradient-to-b from-arbor-night via-arbor-deep to-arbor-night" />
            <div class="absolute inset-0 bg-hero-glow opacity-60" />

            <!-- Floating particles effect (CSS) -->
            <div class="absolute inset-0 overflow-hidden">
                <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-arbor-emerald/30 rounded-full animate-pulse-slow" />
                <div class="absolute top-1/3 right-1/3 w-1 h-1 bg-arbor-moss/40 rounded-full animate-pulse-slow" style="animation-delay: 1s" />
                <div class="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-arbor-sage/20 rounded-full animate-pulse-slow" style="animation-delay: 2s" />
            </div>

            <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="animate-fade-in">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-arbor-glass border border-arbor-glass-border text-arbor-emerald text-sm font-medium mb-8">
                        <span class="w-2 h-2 bg-arbor-emerald rounded-full animate-pulse" />
                        Bientôt disponible
                    </div>
                </div>

                <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-arbor-cream leading-tight mb-6 animate-slide-up">
                    L'archive sonore<br />
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-arbor-emerald to-arbor-moss">de la nature</span>
                </h1>

                <p class="text-lg sm:text-xl text-arbor-sage max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style="animation-delay: 0.1s">
                    Découvrez, partagez et préservez les sons du monde vivant.
                    Une plateforme pour les field recorders et les rêveurs d'espaces sauvages.
                </p>

                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style="animation-delay: 0.2s">
                    <Link href="/map" class="btn-primary text-base px-8 py-4 w-full sm:w-auto">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7" />
                        </svg>
                        Explorer la carte
                    </Link>
                    <Link href="/register" class="btn-secondary text-base px-8 py-4 w-full sm:w-auto">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                        Publier un son
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
        <section class="py-20 border-y border-arbor-glass-border bg-arbor-deep/50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="font-display text-4xl font-bold text-arbor-emerald mb-2">{{ stats.sounds }}+</div>
                        <div class="text-arbor-sage text-sm">Sons naturels</div>
                    </div>
                    <div class="text-center">
                        <div class="font-display text-4xl font-bold text-arbor-emerald mb-2">{{ stats.creators }}+</div>
                        <div class="text-arbor-sage text-sm">Créateurs</div>
                    </div>
                    <div class="text-center">
                        <div class="font-display text-4xl font-bold text-arbor-emerald mb-2">{{ stats.countries }}+</div>
                        <div class="text-arbor-sage text-sm">Pays</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4">
                        Une expérience sonore unique
                    </h2>
                    <p class="text-arbor-sage max-w-xl mx-auto">
                        Arborisis combine cartographie interactive, lecture haute-fidélité et communauté passionnée.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div v-for="feature in features" :key="feature.title" class="glass-card p-8 hover:bg-arbor-glass/50 transition-all duration-300 group">
                        <div class="w-12 h-12 rounded-xl bg-arbor-moss/20 flex items-center justify-center mb-6 group-hover:bg-arbor-moss/30 transition-colors">
                            <svg class="w-6 h-6 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="feature.icon" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-arbor-cream mb-3">{{ feature.title }}</h3>
                        <p class="text-arbor-sage text-sm leading-relaxed">{{ feature.description }}</p>
                    </div>
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
                            <span v-for="cat in categories" :key="cat.name" class="px-3 py-1.5 rounded-lg text-xs font-medium" :class="cat.color">
                                {{ cat.name }}
                            </span>
                        </div>
                        <Link href="/map" class="btn-primary">
                            Ouvrir la carte
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                    <div class="glass-card aspect-[4/3] relative overflow-hidden rounded-2xl border border-arbor-glass-border">
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
                        <!-- Overlay gradient for seamless blend -->
                        <div class="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/5"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ECHO Section -->
        <section class="py-24">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="glass-card p-12 relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-64 h-64 bg-arbor-moss/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div class="relative z-10">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-arbor-emerald/20 mb-6">
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
